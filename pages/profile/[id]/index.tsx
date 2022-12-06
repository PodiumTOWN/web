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
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Post from '../../../components/Post/Post'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'

function Profile() {
  const router = useRouter()
  const { auth, logOut } = useContext(AuthContext)
  const { id } = router.query
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])

  const onLogout = () => {
    logOut()
    router.push('/login')
  }

  if (!auth.currentUser) {
    router.push('/login')
  }

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore()
      const storage = getStorage()
      const docRef = doc(db, 'users', id)
      const dataDoc = await getDoc(docRef)
      const data = dataDoc.data()
      let profile
      if (data?.avatarId) {
        const starsRef = ref(storage, `${data.id}/${data.avatarId}.png`)
        const avatarUrl = await getDownloadURL(starsRef)
        profile = {
          ...data,
          avatarUrl
        }
        setProfile(profile)
      } else {
        profile = data
        setProfile(data)
      }

      const docRefPosts = query(
        collection(db, 'posts'),
        where('ownerId', '==', data.id),
        orderBy('createdAt', 'desc')
      )
      const docSnap = await getDocs(docRefPosts)
      const dataPosts = docSnap.docs
      let postData = dataPosts.map((doc) => doc.data())
      setPosts(postData.map((post) => ({ post, profile })))
    }
    getData()
  }, [])

  return (
    <>
      <Head>
        <title>Podium — {id}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full">
        <div className="flex items-center gap-4 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden relative rounded-full">
              <Image
                src={profile?.avatarUrl || '/dummy-avatar.png'}
                fill
                alt="Avatar"
                className="object-cover"
              />
            </div>
            <div className="text-xl font-medium">{profile?.username}</div>
          </div>
          {auth.currentUser?.uid == profile?.id && (
            <button
              onClick={onLogout}
              className="py-2 px-4 bg-gray-100 font-medium rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        <div>
          {posts.map((post) => (
            <Post key={post.post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Profile
