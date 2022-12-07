import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

export interface IProfile {
  id: string
  username: string
  avatarUrl?: string
  avatarId?: string
  following: string[]
}

export async function getProfile(id: string) {
  const db = getFirestore()
  const storage = getStorage()
  const reference = doc(db, 'users', id)
  const document = await getDoc(reference)
  const data = document.data() as IProfile

  if (data?.avatarId) {
    const avatarRef = ref(storage, `${data.id}/${data.avatarId}.png`)
    const avatarUrl = await getDownloadURL(avatarRef)
    return {
      ...data,
      avatarUrl
    }
  }

  return data
}

export async function getProfileByUsername(username: string) {
  const db = getFirestore()
  const storage = getStorage()
  const profileQuery = query(collection(db, 'users'), where('username', '==', username))
  const documents = await getDocs(profileQuery)
  const data = documents.docs[0].data() as IProfile

  if (data?.avatarId) {
    const avatarRef = ref(storage, `${data.id}/${data.avatarId}.png`)
    const avatarUrl = await getDownloadURL(avatarRef)
    return {
      ...data,
      avatarUrl
    }
  }

  return data
}

export async function getProfiles(ids: string[]) {
  const db = getFirestore()
  const storage = getStorage()
  const profilesQuery = query(collection(db, 'users'), where('id', 'in', ids))
  const { docs } = await getDocs(profilesQuery)
  const profiles = await Promise.all(
    docs.map(async (profile) => {
      const data = profile.data()
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

  return profiles as IProfile[]
}
