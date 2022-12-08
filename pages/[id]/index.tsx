import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getProfileByUsername, IProfile } from '../../lib/profile'
import { getPostsWithProfile, IPostProfile } from '../../lib/posts'

function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [posts, setPosts] = useState<IPostProfile[]>([])

  useEffect(() => {
    const getData = async (id: string) => {
      setIsLoading(true)
      const profile = await getProfileByUsername(id)
      setIsLoading(false)
      setProfile(profile)
      const posts = await getPostsWithProfile(profile)
      setPosts(posts)
    }
    if (id) {
      getData(id as string)
    }
  }, [id])

  return (
    <>
      <Head>
        <title>Podium — {id}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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

export default Profile
