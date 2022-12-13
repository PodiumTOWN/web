import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { IProfile } from './profile'

export interface IHashtag {
  createdAt: number
  hashtag: string
  posts: string[]
}

export async function getTophashtags(): Promise<IHashtag[]> {
  try {
    const db = getFirestore()
    const postsQuery = query(
      collection(db, 'hashtags'),
      orderBy('posts', 'desc'),
      limit(25)
    )
    const documents = await getDocs(postsQuery)
    const data = documents.docs.map((d) => d.data() as IHashtag)

    return data
  } catch (error) {
    throw error
  }
}

export async function search(searchQuery: string): Promise<IProfile[]> {
  const db = getFirestore()
  const storage = getStorage()
  const postsQuery = query(
    collection(db, 'users'),
    where('username', '>=', searchQuery.toLowerCase()),
    where('username', '<=', searchQuery.toLowerCase() + '\uf8ff'),
    limit(50)
  )
  const documents = await getDocs(postsQuery)

  const profiles = await Promise.all(
    documents.docs.map(async (profile) => {
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
