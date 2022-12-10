import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import unique from '../utils/unique'
import { IPost } from './posts'
import { getProfiles, IProfile } from './profile'

export interface IComment extends IPost {
  postId: string
}

export interface IPostComment {
  post: IComment
  profile: IProfile
}

export async function getComments(postId: string): Promise<IPostComment[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
  if (!documents.empty) {
    const data = documents.docs.map((d) => d.data() as IComment)

    const uniqueProfileIds = data.map((d) => d.ownerId).filter(unique)
    const profiles = await getProfiles(uniqueProfileIds)

    return data
      .map((post) => ({
        post,
        profile: profiles.find((profile) => profile.id === post.ownerId)
      }))
      .filter((p) => p.profile) as IPostComment[]
  }
  return []
}

export async function addComment(comment: IPostComment) {
  try {
    const db = getFirestore()
    const reference = doc(db, 'comments', comment.post.id)
    await setDoc(reference, comment.post)
    return comment
  } catch (error) {
    throw error
  }
}
