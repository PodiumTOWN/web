import React, { useState, useEffect, createContext } from 'react'
import nookies from 'nookies'
import {
  ConfirmationResult,
  getAuth,
  signInWithPhoneNumber,
  signOut,
  User
} from 'firebase/auth'
import { app } from '../../firebase/firebaseClient'
import { getProfile, IProfile } from '../../lib/profile'
import Image from 'next/image'

interface IAuthContext {
  isAuthenticated: boolean
  profile: IProfile | null
  logOut: () => void
  verifyPhoneNumber: (phoneNumber: string) => void
  verifyCode: (code: string) => void
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  profile: null,
  logOut: () => {},
  verifyPhoneNumber: () => {},
  verifyCode: () => {}
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
        verifyCode
      }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center" style={{ height: '100vh' }}>
          <Image src="/logo.svg" width={32} height={32} alt="Loading" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
