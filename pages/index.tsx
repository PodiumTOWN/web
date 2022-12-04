import { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import Post from '../components/Post/Post'
import { PostsContext } from '../contexts/PostsContext/PostsContext'

function Page() {
  const { posts } = useContext(PostsContext)

  return (
    <div className="w-full md:max-w-2xl md:border-r-[1px]">
      {posts &&
        Object.values(posts).map((post) => <Post key={post.post.id} post={post} />)}
    </div>
  )
}

export default Page
