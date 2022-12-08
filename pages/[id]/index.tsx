import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getProfileByUsername, IProfile } from '../../lib/profile'
import { getPostsWithProfile, IPostProfile } from '../../lib/posts'
import { GetServerSidePropsContext } from 'next'

interface IProfilePage {
  username: string
}

function ProfilePage({ username }: IProfilePage) {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [posts, setPosts] = useState<IPostProfile[]>([])
  const title = `Podium — ${username}`

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const profile = await getProfileByUsername(username)
      setIsLoading(false)
      setProfile(profile)
      const posts = await getPostsWithProfile(profile)
      setPosts(posts)
    }

    getData()
  }, [username])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${username} on Podium`} />
        <meta property="og:description" content={`${username} on Podium`} key="ogdesc" />
        <meta property="og:url" content={`https://podium.town/${username}`} key="ogurl" />
        <meta property="og:image" content="https://podium.town/logo.png" key="ogimage" />
        <meta
          property="og:site_name"
          content={`${username} on Podium`}
          key="ogsitename"
        />
        <meta property="og:title" content={`${username} on Podium`} key="ogtitle" />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-800">
        {isLoading && (
          <div className="flex justify-center py-8 w-full">
            <Image src="/icons/loading.svg" alt="Back" width={32} height={32} />
          </div>
        )}
        <div className="flex items-center gap-4 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 overflow-hidden relative rounded-full">
              <Image
                src={profile?.avatarUrl || '/dummy-avatar.png'}
                fill
                alt="Avatar"
                className="object-cover"
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
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      username: context.params?.id
    }
  }
}

export default ProfilePage
