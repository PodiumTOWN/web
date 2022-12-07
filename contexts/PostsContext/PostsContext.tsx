import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  getPosts,
  getPostsForHashtag,
  getPostsForProfile,
  IPostProfile
} from '../../lib/posts'
import { AuthContext } from '../AuthContext/AuthContext'

interface IPostsContext {
  posts: null | IPostProfile[]
  profilePosts: null | IPostProfile[]
  setPosts: Dispatch<SetStateAction<IPostProfile[] | null>>
}

const PostsContext = createContext<IPostsContext>({
  posts: null,
  profilePosts: null,
  setPosts: () => null
})

const PostsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const { profile } = useContext(AuthContext)
  const [posts, setPosts] = useState<null | IPostProfile[]>(null)
  const [profilePosts, setProfilePosts] = useState<null | IPostProfile[]>(null)

  useEffect(() => {
    const getData = async () => {
      if (profile) {
        const posts = await getPostsForProfile(profile.following)
        setPosts(posts)
        const profilePosts = await getPosts(profile.id)
        setProfilePosts(profilePosts)
      } else {
        const posts = await getPostsForHashtag('#welcome')
        setPosts(posts)
      }
    }
    getData()
  }, [profile])

  return (
    <PostsContext.Provider value={{ posts, profilePosts, setPosts }}>
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
