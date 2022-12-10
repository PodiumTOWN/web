import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import unique from '../utils/unique'
import { getProfile, getProfiles, IProfile } from './profile'

export interface IPost {
  id: string
  ownerId: string
  text: string
  createdAt: number
  hashtags: string[]
  images: {
    id: string
    url: string
  }[]
}

export interface IPostProfile {
  post: IPost
  profile: IProfile
}

export async function sendPost(post: IPostProfile) {
  try {
    const db = getFirestore()
    const reference = doc(db, 'posts', post.post.id)
    await setDoc(reference, post.post)
    return post
  } catch (error) {
    throw error
  }
}

export async function getPostMinimum(id: string) {
  const db = getFirestore()
  const reference = doc(db, 'posts', id)
  const document = await getDoc(reference)
  const data = document.data() as IPost
  return data
}

export async function getPosts(profileId: string): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('ownerId', '==', profileId),
    limit(25),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
  const data = documents.docs.map((d) => d.data() as IPost)
  if (data.length) {
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

export async function getPostsWithProfile(profile: IProfile): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('ownerId', '==', profile.id),
    limit(25),
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
    limit(25),
    orderBy('createdAt', 'desc')
  )
  const documents = await getDocs(postsQuery)
  const data = documents.docs.map((d) => d.data() as IPost)

  if (data.length) {
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

export async function getPostsForHashtag(hashtag: string): Promise<IPostProfile[]> {
  const db = getFirestore()
  const postsQuery = query(
    collection(db, 'posts'),
    where('hashtags', 'array-contains', hashtag),
    limit(25),
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
  const reference = doc(db, 'posts', id)
  const document = await getDoc(reference)
  const data = document.data() as IPost
  const profile = await getProfile(data.ownerId)
  return {
    post: data,
    profile
  }
}

export async function deletePost(id: string) {
  const db = getFirestore()
  const reference = doc(db, 'posts', id)
  await deleteDoc(reference)
}

export async function reportPost(id: string, fromProfile: IProfile) {
  const db = getFirestore()
  const reference = doc(db, 'reports', id)
  await setDoc(
    reference,
    {
      reporters: arrayUnion(fromProfile.id)
    },
    { merge: true }
  )
}

export async function blockPost(id: string, fromProfile: IProfile) {
  const db = getFirestore()
  const reference = doc(db, 'users', fromProfile.id)
  await updateDoc(reference, {
    blockedPosts: arrayUnion(id)
  })
}
