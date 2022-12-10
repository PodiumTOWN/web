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
import { getProfile, IProfile, createProfile } from '../../lib/profile'
import { FirebaseError } from 'firebase/app'

interface IAuthContext {
  isAuthenticated: boolean
  profile: IProfile | null
  user: UserCredential | null
  logOut: () => void
  verifyPhoneNumber: (phoneNumber: string) => void
  verifyCode: (code: string) => void
  signInWithEmail: (email: string, password: string) => Promise<IProfile>
  createAccount: (email: string, password: string) => Promise<UserCredential>
  createProfileFn: (id: string, username: string) => Promise<IProfile>
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  profile: null,
  user: null,
  logOut: () => {},
  verifyPhoneNumber: () => {},
  verifyCode: () => {},
  isLoading: true,
  signInWithEmail: async () => ({} as any),
  createAccount: async () => ({} as any),
  createProfileFn: async () => ({} as any)
})

export function AuthProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [user, setUser] = useState<UserCredential | null>(null)
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
      try {
        const profile = await getProfile(user.uid)
        const token = await user.getIdToken()
        setProfile(profile)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', token, { path: '/' })
        setIsLoading(false)
      } catch (error) {
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', { path: '/' })
        setIsLoading(false)
        setProfile(null)
      }
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
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser(result)
      const profile = await getProfile(result.user.uid)
      setProfile(profile)
      return profile
    } catch (error) {
      throw error
    }
  }

  const createAccount = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw (error as FirebaseError).code
    }
  }

  const createProfileFn = async (id: string, username: string) => {
    try {
      const result = await createProfile(id, username)
      setProfile(result)
      return result
    } catch (error) {
      throw error
    }
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
        user,
        verifyPhoneNumber,
        verifyCode,
        signInWithEmail,
        isLoading,
        createAccount,
        createProfileFn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
