import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { v4 as uuid } from 'uuid'
import {
  getPosts,
  getPostsForHashtag,
  getPostsForProfile,
  IPostProfile,
  sendPost
} from '../../lib/posts'
import { AuthContext } from '../AuthContext/AuthContext'

interface IPostsContext {
  posts: null | IPostProfile[]
  profilePosts: null | IPostProfile[]
  setPosts: Dispatch<SetStateAction<IPostProfile[] | null>>
  send: (text: string) => Promise<IPostProfile>
}

const PostsContext = createContext<IPostsContext>({
  posts: null,
  profilePosts: null,
  setPosts: () => null,
  send: async () => ({} as any)
})

const PostsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const { profile, isLoading } = useContext(AuthContext)
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
    if (!isLoading) {
      getData()
    }
  }, [profile, isLoading])

  const send = async (text: string) => {
    const post: IPostProfile = {
      post: {
        ownerId: profile!.id,
        createdAt: Math.round(Date.now() / 1000),
        hashtags: [],
        images: [],
        id: uuid(),
        text
      },
      profile: profile!
    }
    if (posts) {
      setPosts([post, ...posts])
    } else {
      setPosts([post])
    }
    return await sendPost(post)
  }

  return (
    <PostsContext.Provider value={{ send, posts, profilePosts, setPosts }}>
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
