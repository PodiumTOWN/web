import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getProfileByUsername, IProfile } from '../../lib/profile'
import { getPostsWithProfile, IPostProfile } from '../../lib/posts'
import { GetServerSidePropsContext } from 'next'
import LoadingSVG from '../../public/icons/loading.svg'

interface IProfilePage {
  profile: IProfile
}

function ProfilePage({ profile }: IProfilePage) {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<IPostProfile[]>([])
  const title = `Podium — ${profile.username}`

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const posts = await getPostsWithProfile(profile)
      setPosts(posts)
      setIsLoading(false)
    }

    getData()
  }, [profile])

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

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-800">
        {isLoading ? (
          <div className="flex justify-center py-8 w-full">
            <LoadingSVG />
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
            </div>

            <div>
              {posts.map((post) => (
                <Post key={post.post.id} post={post} />
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
