import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'
import { getPostsForHashtag, IPostProfile } from '../../lib/posts'
import Loading from '../Loading/Loading'
import Post from '../Post/Post'

interface IPostList {
  hashtag?: string
}

export default function PostList({ hashtag }: IPostList) {
  const { profile, blockProfileFn } = useContext(AuthContext)
  const { posts, deletePostFn, blockPostFn, reportPostFn } = useContext(PostsContext)
  const [localPosts, setLocalPosts] = useState<IPostProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (hashtag) {
      const getData = async () => {
        try {
          const result = await getPostsForHashtag(`#${hashtag}`)
          setLocalPosts(result)
          setIsLoading(false)
        } catch {}
      }
      getData()
    } else {
      if (posts) {
        setLocalPosts(posts)
        setIsLoading(false)
      }
    }
  }, [hashtag, posts])

  return (
    <div className="w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-900">
      {localPosts && !isLoading ? (
        localPosts.length ? (
          localPosts.map((post) => (
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
  )
}
