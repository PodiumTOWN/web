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
  blockPost,
  deletePost,
  getPosts,
  getPostsForHashtag,
  getPostsForProfile,
  IPostProfile,
  reportPost,
  sendPost
} from '../../lib/posts'
import { AuthContext } from '../AuthContext/AuthContext'

interface IPostsContext {
  posts: null | IPostProfile[]
  profilePosts: null | IPostProfile[]
  setPosts: Dispatch<SetStateAction<IPostProfile[] | null>>
  send: (text: string) => Promise<IPostProfile>
  deletePostFn: (postId: string) => Promise<void>
  blockPostFn: (postId: string) => Promise<void>
  reportPostFn: (postId: string) => Promise<void>
  isLoading: boolean
}

const PostsContext = createContext<IPostsContext>({
  posts: null,
  profilePosts: null,
  setPosts: () => null,
  send: async () => ({} as any),
  deletePostFn: async () => {},
  blockPostFn: async () => {},
  reportPostFn: async () => {},
  isLoading: false
})

const PostsContextProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [isLoading, setIsLoading] = useState(true)
  const { profile, isLoading: isAuthLoading } = useContext(AuthContext)
  const [posts, setPosts] = useState<null | IPostProfile[]>(null)
  const [profilePosts, setProfilePosts] = useState<null | IPostProfile[]>(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      if (profile) {
        const posts = await getPostsForProfile(profile.following)
        setPosts(
          posts
            .filter((p) => !profile.blockedPosts.includes(p.post.id))
            .filter((p) => !profile.blockedProfiles.includes(p.profile.id))
        )
        const profilePosts = await getPosts(profile.id)
        setProfilePosts(profilePosts)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        // const posts = await getPostsForHashtag('#welcome')
        // setPosts(posts)
      }
    }
    if (!isAuthLoading) {
      getData()
    }
  }, [profile, isAuthLoading])

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

  const deletePostFn = async (postId: string) => {
    if (posts) {
      setPosts(posts.filter((p) => p.post.id !== postId))
    }
    if (profilePosts) {
      setProfilePosts(profilePosts.filter((p) => p.post.id !== postId))
    }
    await deletePost(postId)
  }

  const blockPostFn = async (postId: string) => {
    if (posts && profile) {
      setPosts(posts.filter((p) => p.post.id !== postId))
      await blockPost(postId, profile)
    }
  }

  const reportPostFn = async (postId: string) => {
    if (posts && profile) {
      setPosts(posts.filter((p) => p.post.id !== postId))
      await reportPost(postId, profile)
    }
  }

  return (
    <PostsContext.Provider
      value={{
        reportPostFn,
        blockPostFn,
        deletePostFn,
        send,
        posts,
        profilePosts,
        setPosts,
        isLoading
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
