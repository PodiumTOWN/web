import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Post from '../../components/Post/Post'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

function Profile() {
  const router = useRouter()
  const { auth, logOut, user, userPosts } = useContext(AuthContext)

  const onLogout = () => {
    logOut()
    router.push('/')
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Podium — Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full">
        <div className="flex items-center gap-4 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden relative">
              <Image src={user?.avatarUrl || '/dummy-avatar.png'} fill alt="Avatar" />
            </div>
            <div className="text-xl font-medium">{user?.username}</div>
          </div>
          <button
            onClick={onLogout}
            className="py-2 px-4 bg-gray-100 font-medium rounded-lg"
          >
            Logout
          </button>
        </div>

        <div>
          {userPosts.map((post) => (
            <Post key={post.post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Profile
