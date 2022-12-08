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
import { getStorage } from 'firebase/storage'
import unique from '../utils/unique'
import { getProfile, getProfiles, IProfile } from './profile'

export interface IPost {
  id: string
  ownerId: string
  text: string
}

export interface IPostProfile {
  post: IPost
  profile: IProfile
}

export async function getPosts(profileId: string): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('ownerId', '==', profileId),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
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

export async function getPostsWithProfile(profile: IProfile): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('ownerId', '==', profile.id),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
  const data = documents.docs.map((d) => d.data() as IPost)

  return data
    .map((post) => ({
      post,
      profile
    }))
    .filter((p) => p.profile) as IPostProfile[]
}

export async function getPostsForProfile(
  followingIds: string[]
): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('ownerId', 'in', followingIds),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
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

export async function getPostsForHashtag(hashtag: string): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('hashtags', 'array-contains', hashtag),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
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

export async function getPost(id: string): Promise<IPostProfile> {
  const db = getFirestore()
  const storage = getStorage()
  const reference = doc(db, 'posts', id)
  const document = await getDoc(reference)
  const data = document.data() as IPost
  const profile = await getProfile(data.ownerId)
  return {
    post: data,
    profile
  }
}
