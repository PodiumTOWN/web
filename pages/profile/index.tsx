import { Button } from 'flowbite-react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Post from '../../components/Post/Post'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'

function Profile() {
  const { logOut, profile, blockProfileFn } = useContext(AuthContext)
  const { profilePosts, setPosts, deletePostFn, blockPostFn, reportPostFn } =
    useContext(PostsContext)
  const router = useRouter()

  const onLogout = () => {
    logOut()
    setPosts([])
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Podium — Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-900">
        <div className="flex items-center gap-4 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden relative rounded-full bg-gray-100 dark:bg-zinc-900">
              <Image
                src={profile?.avatarUrl || '/dummy-avatar.png'}
                fill
                alt="Avatar"
                className="object-cover"
                priority
              />
            </div>
            <div className="text-xl font-medium">{profile?.username}</div>
          </div>
          <Button onClick={onLogout} color="secondary">
            Logout
          </Button>
        </div>

        <div>
          {profilePosts?.map((post) => (
            <Post
              key={post.post.id}
              post={post}
              onDeletePost={deletePostFn}
              onBlockPost={blockPostFn}
              onReportPost={reportPostFn}
              onBlockProfile={blockProfileFn}
              fromProfile={profile}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Profile
