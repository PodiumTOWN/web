import Head from 'next/head'
import Image from 'next/image'
import { Button } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getProfileByUsername, IProfile } from '../../lib/profile'
import { getPostsWithProfile, IPostProfile } from '../../lib/posts'
import { GetServerSidePropsContext } from 'next'
import LoadingSVG from '../../public/icons/loading.svg'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'

interface IProfilePage {
  profile: IProfile
}

function ProfilePage({ profile }: IProfilePage) {
  const [isPending, setIsPending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<IPostProfile[]>([])
  const title = `Podium — ${profile.username}`
  const { deletePostFn, blockPostFn, reportPostFn } = useContext(PostsContext)
  const {
    unfollowFn,
    followFn,
    profile: fromProfile,
    blockProfileFn
  } = useContext(AuthContext)

  useEffect(() => {
    const getData = async () => {
      if (!fromProfile?.blockedProfiles.includes(profile.id)) {
        setIsLoading(true)
        const posts = await getPostsWithProfile(profile)
        setPosts(posts)
        setIsLoading(false)
      }
    }

    getData()
  }, [profile, fromProfile])

  const follow = async () => {
    setIsPending(true)
    await followFn(profile.id)
    setIsPending(false)
  }

  const unfollow = async () => {
    setIsPending(true)
    await unfollowFn(profile.id)
    setIsPending(false)
  }

  const onDeletePost = async (postId: string) => {
    setPosts(posts.filter((p) => p.post.id !== postId))
    deletePostFn(postId)
  }

  const onBlockPost = async (postId: string) => {
    setPosts(posts.filter((p) => p.post.id !== postId))
    blockPostFn(postId)
  }

  const onReportPost = async (postId: string) => {
    reportPostFn(postId)
  }

  const onBlockProfile = async (id: string) => {
    blockProfileFn(id)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${profile.username} on Podium`} />
        <meta
          property="og:description"
          content={`${profile.username} on Podium`}
          key="ogdesc"
        />
        <meta
          property="og:url"
          content={`https://podium.town/${profile.username}`}
          key="ogurl"
        />
        <meta property="og:image" content={profile.avatarUrl} key="ogimage" />
        <meta
          property="og:site_name"
          content={`${profile.username} on Podium`}
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={`${profile.username} on Podium`}
          key="ogtitle"
        />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-900">
        {isLoading ? (
          <div className="flex justify-center py-8 w-full">
            <div className="w-6 h-6">
              <LoadingSVG />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 overflow-hidden relative rounded-full bg-gray-100 dark:bg-zinc-900">
                  <Image
                    src={profile?.avatarUrl || '/dummy-avatar.png'}
                    fill
                    alt="Avatar"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="text-xl font-medium">{profile?.username}</div>
              </div>
              {fromProfile && fromProfile.id !== profile.id && (
                <>
                  {fromProfile?.following.includes(profile.id) ? (
                    <Button color="primary" onClick={unfollow} disabled={isPending}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button color="primary" onClick={follow} disabled={isPending}>
                      Follow
                    </Button>
                  )}
                </>
              )}
            </div>

            <div>
              {posts.map((post) => (
                <Post
                  key={post.post.id}
                  post={post}
                  onDeletePost={onDeletePost}
                  onBlockPost={onBlockPost}
                  onReportPost={onReportPost}
                  onBlockProfile={onBlockProfile}
                  fromProfile={fromProfile}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

ProfilePage.getInitialProps = async (context: GetServerSidePropsContext) => {
  const username = context.query.id
  const profile = await getProfileByUsername(username as string)

  return { profile }
}

export default ProfilePage
