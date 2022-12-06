import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import unique from '../../../utils/unique'

export default async function handler(req: any, res: any) {
  const db = getFirestore()
  const storage = getStorage()
  const docRef = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
  const docSnap = await getDocs(docRef)
  const data = docSnap.docs
  let postData = data.map((doc) => doc.data())
  if (postData.length) {
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
  } else {
    res.status(200).json([])
  }
}
