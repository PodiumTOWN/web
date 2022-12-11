import Image from 'next/image'
import { TextInput, Button } from 'flowbite-react'
import SearchSVG from '../../public/icons/search.svg'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import { useRouter } from 'next/router'
import { getTophashtags, IHashtag, search } from '../../lib/explore'
import Link from 'next/link'
import { IProfile } from '../../lib/profile'
import LoaderSVG from '../../public/icons/loading.svg'

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [topHashtags, setTopHashtags] = useState<IHashtag[]>([])
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const {
    profile: fromProfile,
    isLoading: iProfileLoading,
    followFn,
    unfollowFn
  } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      if (!fromProfile && !iProfileLoading) {
        router.push('/')
      } else {
        const result = await getTophashtags()
        setTopHashtags(result)
      }
    }
    getData()
  }, [fromProfile, router, iProfileLoading])

  if (!fromProfile) {
    return null
  }

  const follow = async (id: string) => {
    setIsPending(true)
    await followFn(id)
    setIsPending(false)
  }

  const unfollow = async (id: string) => {
    setIsPending(true)
    await unfollowFn(id)
    setIsPending(false)
  }

  const onChangeQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.length > 2) {
      setIsLoading(true)
      const result = await search(query)
      setProfiles(result.filter((p) => !fromProfile.blockedProfiles.includes(p.id)))
      setIsLoading(false)
    } else {
      setProfiles([])
    }
  }

  return (
    <div className="px-5 md:p-12 flex flex-col gap-6 md:max-w-4xl">
      <div className="relative">
        <TextInput
          value={searchQuery}
          onChange={onChangeQuery}
          color="primary"
          type="text"
          placeholder="Search..."
          icon={SearchSVG}
          sizing="lg"
        />
        {isLoading && (
          <div className="w-7 h-7 absolute top-4 right-4">
            <LoaderSVG />
          </div>
        )}
      </div>

      <div className="h-[8rem] md:h-[16rem] overflow-hidden relative rounded-xl flex justify-center items-center">
        <Link href="/tag/welcome">
          <Image src="/welcome.jpg" alt="Welcome" fill className="object-cover" />
          <div className="z-2 relative text-white">#welcome</div>
        </Link>
      </div>

      {profiles.length > 0 ? (
        <div>
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl justify-between"
            >
              <Link href={`/${profile.username}`} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={profile.avatarUrl || '/dummy-avatar.png'}
                    fill
                    alt="Avatar"
                  />
                </div>
                <div className="font-medium">{profile.username}</div>
              </Link>
              {fromProfile && fromProfile.id !== profile.id && (
                <>
                  {fromProfile?.following.includes(profile.id) ? (
                    <Button
                      color="primary"
                      onClick={() => unfollow(profile.id)}
                      disabled={isPending}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => follow(profile.id)}
                      disabled={isPending}
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <div className="text-md font-medium">🌎 Global trends</div>
            <div className="flex gap-2">
              {topHashtags.map((tag) => (
                <Link key={tag.hashtag} href={`/tag/${tag.hashtag.replace('#', '')}`}>
                  <div className="bg-gray-100 dark:bg-zinc-900 px-3 py-2 rounded-full text-sm font-medium">
                    {tag.hashtag}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-md font-medium flex justify-between">
              <span>💪 Active votings</span>
              <div className="text-gray-400 text-sm">How does it work ?</div>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-xl text-sm font-medium w-full flex justify-between">
                <div>Ban profile @bot123</div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    98%
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    28%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ExplorePage
