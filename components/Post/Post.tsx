import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

interface IPost {
  post: any
  variant?: string
}

export default function Post({ post, variant = 'base' }: IPost) {
  return (
    <Link href={`post/${post.post.id}`}>
      <div className="flex w-full p-5 border-b-[1px] transition ease-in-out hover:bg-gray-100">
        <div className="h-[52px] min-w-[52px] relative overflow-hidden mr-3 rounded-full">
          <Image
            alt="Home"
            src={post.profile.avatarUrl || '/dummy-avatar.png'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="font-semibold hover:underline">{post.profile.username}</div>
            <div className="flex items-center gap-2">
              <div>
                <Image alt="More" src="/icons/more.svg" height={20} width={20} />
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
    </Link>
  )
}
