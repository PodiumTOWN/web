import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import unique from '../../../utils/unique'

export default async function handler(req: any, res: any) {
  const app = initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  })

  const db = getFirestore(app)
  const auth = getAuth()
  const storage = getStorage(app)

  const docRef = collection(db, 'posts')
  const docSnap = await getDocs(docRef)
  const data = docSnap.docs
  let postData = data.map((doc) => doc.data())

  let uniqueProfileIds = postData.map((p) => p.ownerId).filter(unique)

  let profiles = query(collection(db, 'users'), where('id', 'in', uniqueProfileIds))
  let s = await getDocs(profiles)
  let profiless = await Promise.all(
    s.docs.map(async (p) => {
      const data = p.data()
      if (data.avatarId) {
        const starsRef = ref(storage, `${data.id}/${data.avatarId}.png`)
        const avatarUrl = await getDownloadURL(starsRef)
        return {
          ...data,
          avatarUrl
        }
      }

      return data
    })
  )

  let final = postData.map((pd) => {
    let profile = profiless.find((it) => it.id == pd.ownerId)
    return {
      post: pd,
      profile
    }
  })

  res.status(200).json(final)
}
