import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Post from '../components/Post/Post'
import { PostsContext } from '../contexts/PostsContext/PostsContext'

function HomePage() {
  const { posts } = useContext(PostsContext)

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <Image src="/icons/loading.svg" alt="Back" width={32} height={32} />
    </div>
  )

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full">
        {!posts && <Loading />}
        {posts?.map((post) => (
          <Post key={post.post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default HomePage
