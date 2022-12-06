import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import unique from '../../utils/unique'

function Path() {
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const { tag } = router.query

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore()
      const storage = getStorage()
      const docRef = query(
        collection(db, 'posts'),
        where('hashtags', 'array-contains', `#${tag}`),
        orderBy('createdAt', 'desc')
      )
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
        setPosts(final)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full">
        {posts?.map((post: any) => (
          <Post key={post.post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Path
