import { createContext, useEffect, useState } from 'react'

interface IPostsContext {
  posts: null | any
}

const PostsContext = createContext<IPostsContext>({ posts: null })

const PostsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [posts, setPosts] = useState<null | { [key: string]: any }>(null)

  useEffect(() => {
    const getPosts = async () => {
      let result = await fetch('/api/posts')
      let posts = await result.json()
      setPosts(posts)
    }
    getPosts()
  }, [])

  return <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>
}

export { PostsContext, PostsContextProvider }
