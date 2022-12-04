import { createContext, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'

const DBContext = createContext<any>({})

const DBContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  // const app = initializeApp({
  //   apiKey: process.env.API_KEY,
  //   authDomain: process.env.AUTH_DOMAIN,
  //   databaseURL: process.env.DATABASE_URL,
  //   projectId: process.env.PROJECT_ID,
  //   storageBucket: process.env.STORAGE_BUCKET,
  //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
  //   appId: process.env.APP_ID,
  //   measurementId: process.env.MEASUREMENT_ID
  // })

  // const db = getFirestore(app)
  // const auth = getAuth()
  // const storage = getStorage(app)

  return <DBContext.Provider value={{}}>{children}</DBContext.Provider>
}

export { DBContext, DBContextProvider }
