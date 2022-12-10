import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import Post from '../components/Post/Post'
import { AuthContext } from '../contexts/AuthContext/AuthContext'
import { PostsContext } from '../contexts/PostsContext/PostsContext'
import LoaderSVG from '../public/icons/loading.svg'

function HomePage() {
  const { profile, blockProfileFn } = useContext(AuthContext)
  const { posts, deletePostFn, blockPostFn, reportPostFn } = useContext(PostsContext)

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <div className="w-6 h-6">
        <LoaderSVG />
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-900">
        {posts ? (
          posts.length ? (
            posts.map((post) => (
              <Post
                key={post.post.id}
                post={post}
                onDeletePost={deletePostFn}
                onBlockPost={blockPostFn}
                onReportPost={reportPostFn}
                onBlockProfile={blockProfileFn}
                fromProfile={profile}
              />
            ))
          ) : (
            <div className="flex justify-center p-12">
              <Link className="inline" href="/explore">
                No posts. Follow some people in Explore tab.
              </Link>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

export default HomePage
