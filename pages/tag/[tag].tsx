import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'
import { getPostsForHashtag, IPostProfile } from '../../lib/posts'
import LoadingSVG from '../../public/icons/loading.svg'

function TagPage() {
  const [posts, setPosts] = useState<IPostProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { tag } = router.query
  const { blockProfileFn, profile } = useContext(AuthContext)
  const { deletePostFn, blockPostFn, reportPostFn } = useContext(PostsContext)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const result = await getPostsForHashtag(`#${tag}`)
      setPosts(result)
      setIsLoading(false)
    }
    if (tag) {
      getData()
    }
  }, [tag])

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-800">
        {isLoading ? (
          <div className="flex justify-center py-8 w-full">
            <div className="w-7 h-7">
              <LoadingSVG />
            </div>
          </div>
        ) : (
          posts?.map((post: any) => (
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
        )}
      </div>
    </>
  )
}

export default TagPage
