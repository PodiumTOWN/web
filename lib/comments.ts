import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import unique from '../utils/unique'
import { getProfiles, IProfile } from './profile'

export interface IPost {
  id: string
  ownerId: string
  text: string
}

export interface IPostProfile {
  post: IPost
  profile: IProfile
}

export async function getComments(postId: string): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
  if (!documents.empty) {
    const data = documents.docs.map((d) => d.data() as IPost)

    const uniqueProfileIds = data.map((d) => d.ownerId).filter(unique)
    const profiles = await getProfiles(uniqueProfileIds)

    return data
      .map((post) => ({
        post,
        profile: profiles.find((profile) => profile.id === post.ownerId)
      }))
      .filter((p) => p.profile) as IPostProfile[]
  }
  return []
}
