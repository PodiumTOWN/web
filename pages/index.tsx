import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Post from '../components/Post/Post'
import { AuthContext } from '../contexts/AuthContext/AuthContext'
import { PostsContext } from '../contexts/PostsContext/PostsContext'

function Page() {
  const { posts } = useContext(PostsContext)
  const { user } = useContext(AuthContext)
  const router = useRouter()

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <Image src="/icons/loading.svg" alt="Back" width={32} height={32} />
    </div>
  )

  useEffect(() => {
    if (!user) {
      router.push('/tag/welcome')
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {user ? (
        <>
          {!posts && <Loading />}

          <div className="w-full md:max-w-2xl md:border-r-[1px] h-full">
            {posts?.map((post: any) => (
              <Post key={post.post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Page
