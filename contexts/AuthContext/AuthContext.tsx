import React, { useState, useEffect, createContext } from 'react'
import nookies from 'nookies'
import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  UserCredential
} from 'firebase/auth'
import { app } from '../../firebase/firebaseClient'
import { getProfile, IProfile } from '../../lib/profile'

interface IAuthContext {
  isAuthenticated: boolean
  profile: IProfile | null
  logOut: () => void
  verifyPhoneNumber: (phoneNumber: string) => void
  verifyCode: (code: string) => void
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>
  createAccount: (email: string, password: string) => Promise<UserCredential>
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  profile: null,
  logOut: () => {},
  verifyPhoneNumber: () => {},
  verifyCode: () => {},
  isLoading: true,
  signInWithEmail: async () => ({} as any),
  createAccount: async () => ({} as any)
})

export function AuthProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(
    null
  )
  const auth = getAuth(app)

  useEffect(() => {
    setIsLoading(true)
    if (typeof window !== 'undefined') {
      ;(window as any).nookies = nookies
    }
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', { path: '/' })
        setIsLoading(false)
        setProfile(null)
        return
      }
      const profile = await getProfile(user.uid)
      const token = await user.getIdToken()
      setProfile(profile)
      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, { path: '/' })
      setIsLoading(false)
    })
  }, [auth])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [auth.currentUser])

  const verifyPhoneNumber = async (phoneNumber: string) => {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      (window as any).recaptchaVerifier
    )
    setConfirmationResult(confirmationResult)
  }

  const verifyCode = async (code: string) => {
    await confirmationResult?.confirm(code)
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const createAccount = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    signOut(auth)
    setProfile(null)
    nookies.destroy(null, 'token')
    nookies.set(null, 'token', '', { path: '/' })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!profile,
        logOut,
        profile,
        verifyPhoneNumber,
        verifyCode,
        signInWithEmail,
        isLoading,
        createAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
