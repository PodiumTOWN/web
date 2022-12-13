import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Post from '../components/Post/Post'
import { AuthContext } from '../contexts/AuthContext/AuthContext'
import { PostsContext } from '../contexts/PostsContext/PostsContext'
import LoaderSVG from '../public/icons/loading.svg'

function HomePage() {
  const router = useRouter()
  const { profile, blockProfileFn } = useContext(AuthContext)
  const { posts, deletePostFn, blockPostFn, reportPostFn, isLoading } =
    useContext(PostsContext)

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <div className="w-6 h-6">
        <LoaderSVG />
      </div>
    </div>
  )

  useEffect(() => {
    if (!isLoading && !posts) {
      router.push('/tag/welcome')
    }
  }, [isLoading, posts, router])

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Open social network." />
        <meta property="og:description" content="Open social network" key="ogdesc" />
        <meta property="og:url" content="https://podium.town" key="ogurl" />
        <meta property="og:image" content="https://podium.town/logo.png" key="ogimage" />
        <meta
          property="og:site_name"
          content="Podium — Open social network"
          key="ogsitename"
        />
        <meta property="og:title" content="Open social network." key="ogtitle" />
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
