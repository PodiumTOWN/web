import { getAuth } from 'firebase/auth'
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
import unique from '../../../utils/unique'
import { app, auth } from '../../../utils/firebase'

export default async function handler(req: any, res: any) {
  const auth = getAuth(app)
  console.log(auth.currentUser)
  const db = getFirestore()
  const storage = getStorage()
  const docRef = doc(db, 'users', auth.currentUser!.uid)
  const dataDoc = await getDoc(docRef)
  const data = dataDoc.data()
  if (data?.avatarId) {
    const starsRef = ref(storage, `${data.id}/${data.avatarId}.png`)
    const avatarUrl = await getDownloadURL(starsRef)
    res.status(200).json({
      ...data,
      avatarUrl
    })
  }
  res.status(200).json(data)
}
