import Head from 'next/head'
import { useContext } from 'react'
import Post from '../components/Post/Post'
import { PostsContext } from '../contexts/PostsContext/PostsContext'
import LoaderSVG from '../public/icons/loading.svg'

function HomePage() {
  const { posts } = useContext(PostsContext)

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <LoaderSVG />
    </div>
  )

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-800">
        {posts ? (
          posts.map((post) => <Post key={post.post.id} post={post} />)
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

export default HomePage
