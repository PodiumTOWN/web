import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  signInWithPhoneNumber,
  ConfirmationResult,
  UserCredential
} from 'firebase/auth'
import { auth } from '../../utils/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { useRouter } from 'next/router'

interface IAuthContext {
  auth: Auth
  verifyPhone: (phoneNumber: string) => void
  verifyCode: (code: string) => void
  logOut: () => void
}

export const AuthContext = createContext<IAuthContext>({} as any)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserCredential | null>(null)
  const [userPosts, setUserPosts] = useState([])
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(
    null
  )

  const db = getFirestore()
  const storage = getStorage()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(db, 'users', auth.currentUser!.uid)
        const dataDoc = await getDoc(docRef)
        const data = dataDoc.data()
        if (data?.avatarId) {
          const starsRef = ref(storage, `${data.id}/${data.avatarId}.png`)
          const avatarUrl = await getDownloadURL(starsRef)
          setUser({
            ...data,
            avatarUrl
          })
        } else {
          setUser(data)
        }

        setLoading(false)

        const docRefPosts = query(
          collection(db, 'posts'),
          where('ownerId', '==', data.id),
          orderBy('createdAt', 'desc')
        )
        const docSnap = await getDocs(docRefPosts)
        const dataPosts = docSnap.docs
        let postData = dataPosts.map((doc) => doc.data())
        setUserPosts(postData.map((post) => ({ post, profile: data })))
      }
    })

    return () => unsubscribe()
  }, [])

  const verifyPhone = async (phoneNumber: string) => {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    )
    setConfirmationResult(confirmationResult)
  }

  const verifyCode = async (code: string) => {
    const result = await confirmationResult?.confirm(code)
    setUser(result || null)
    router.push('/')
  }

  const logOut = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ verifyPhone, verifyCode, logOut, auth, user, userPosts }}
    >
      {children}
    </AuthContext.Provider>
  )
}
