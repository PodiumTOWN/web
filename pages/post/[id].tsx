import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'

function PostRoute() {
  const router = useRouter()
  const { id } = router.query
  const { posts } = useContext(PostsContext)
  const [comments, setComments] = useState<any[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const comments = await fetch(`/api/comments/${id}`)
      const result = await comments.json()
      setComments(result)
    }
    if (id) {
      getData()
    }
  }, [id])

  if (!posts) {
    return null
  }

  return (
    <div className="w-full md:max-w-2xl md:border-r-[1px]">
      <div className="p-4">
        <div className="cursor-pointer" onClick={() => router.back()}>
          <Image src="/icons/arrow-left.svg" alt="Back" width={32} height={32} />
        </div>
      </div>
      <Post post={posts[id as string]} variant="big" />
      {comments?.map((comment) => (
        <Post key={comment.post.id} post={comment} />
      ))}
    </div>
  )
}

export default PostRoute
