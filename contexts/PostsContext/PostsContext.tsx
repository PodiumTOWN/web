import { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { DBContext } from '../DBContext/DBContext'
import unique from '../../utils/unique'

interface IPostsContext {
  posts: null | { [key: string]: any }
}

const PostsContext = createContext<IPostsContext>({ posts: null })

const PostsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [posts, setPosts] = useState<null | { [key: string]: any }>(null)
  const [isLoading, setLoading] = useState(false)
  const { db, storage } = useContext(DBContext)

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
