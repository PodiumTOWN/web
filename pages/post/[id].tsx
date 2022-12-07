import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'
import { getPost } from '../../lib/posts'

function PostPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const { posts } = useContext(PostsContext)
  const [comments, setComments] = useState<any[] | null>(null)
  const found = posts?.find((p) => p.post.id === id)
  const [post, setPost] = useState(found)

  useEffect(() => {
    const getData = async (id: string) => {
      setIsLoading(true)
      if (!post) {
        const result = await getPost(id)
        setPost(result)
      }
      const comments = await fetch(`/api/comments/${id}`)
      const result = await comments.json()
      setComments(result)
      setIsLoading(false)
    }
    if (id) {
      getData(id as string)
    }
  }, [id, post])

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <Image src="/icons/loading.svg" alt="Back" width={32} height={32} />
    </div>
  )

  return (
    <>
      <Head>
        <title>Podium — Post by {post?.profile.username}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] h-full">
        <div className="py-2 px-4">
          <div className="cursor-pointer" onClick={() => router.back()}>
            <Image src="/icons/arrow-left.svg" alt="Back" width={32} height={32} />
          </div>
        </div>
        <Post post={post} variant="big" />
        {isLoading ? (
          <Loading />
        ) : (
          comments?.map((comment) => <Post key={comment.post.id} post={comment} />)
        )}
      </div>
    </>
  )
}

export default PostPage
