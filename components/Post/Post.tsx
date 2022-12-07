import Image from 'next/image'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import MoreSVG from '../../public/icons/more.svg'

interface IPost {
  post: any
  variant?: string
}

export default function Post({ post, variant = 'base' }: IPost) {
  const router = useRouter()

  if (!post) {
    return null
  }

  const onNavigatePost = (e: MouseEvent<HTMLElement>) => {
    router.push(`/post/${post.post.id}`)
    e.stopPropagation()
  }

  const onNavigateProfile = (e: MouseEvent<HTMLElement>) => {
    router.push(`/${post.profile.username}`)
    e.stopPropagation()
  }

  return (
    <div
      onClick={onNavigatePost}
      className="flex w-full p-5 border-b-[1px] dark:border-b-zinc-800 transition ease-in-out md:hover:bg-gray-100 md:dark:hover:bg-zinc-900 cursor-pointer"
    >
      <div
        onClick={onNavigateProfile}
        className="h-[52px] min-w-[52px] relative overflow-hidden mr-3 rounded-full"
      >
        <Image
          alt="Home"
          src={post.profile.avatarUrl || '/dummy-avatar.png'}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div onClick={onNavigateProfile} className="font-semibold hover:underline">
            {post.profile.username}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="text-gray-400">
              <MoreSVG className="w-4 h-4" />
            </div>
            <div className="text-gray-400">
              {dayjs().to(dayjs(post.post.createdAt * 1000))}
            </div>
          </div>
        </div>
        <div className={`${variant === 'big' ? 'text-2xl' : 'text-base'}`}>
          {post.post.text}
        </div>
        <div className="flex -mx-1 mt-1">
          {post.post.images.map((image: any) => (
            <div
              key={image.id}
              className="flex-1 relative h-[250px] overflow-hidden rounded-xl mx-1"
            >
              <Image alt="More" src={image.url} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
