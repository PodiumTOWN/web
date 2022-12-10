import Image from 'next/image'
import dayjs from 'dayjs'
import { Modal, Carousel } from 'flowbite-react'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import MoreSVG from '../../public/icons/more.svg'
import { IPostProfile } from '../../lib/posts'
import { IPostComment } from '../../lib/comments'

interface IPost {
  post: IPostProfile | IPostComment
  variant?: string
}

export default function Post({ post, variant = 'base' }: IPost) {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onImage = (e: MouseEvent<HTMLElement>) => {
    setIsModalVisible(true)
    e.stopPropagation()
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
    <>
      <div
        onClick={onNavigatePost}
        className="flex w-full p-5 border-b-[1px] dark:border-b-zinc-900 transition ease-in-out md:hover:bg-gray-100 md:dark:hover:bg-zinc-900 cursor-pointer"
      >
        <div
          onClick={onNavigateProfile}
          className="h-[52px] min-w-[52px] relative overflow-hidden mr-3 rounded-full bg-gray-100 dark:bg-zinc-900"
        >
          <Image
            priority
            alt="Avatar"
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
          <div className="flex -mx-1 mt-1" onClick={onImage}>
            {post.post.images.map((image) => (
              <div
                key={image.id}
                className="flex-1 relative h-[250px] overflow-hidden rounded-xl mx-1 bg-gray-100 dark:bg-zinc-900"
              >
                <Image
                  alt="Image"
                  src={image.url}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)} size="5xl">
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 p-6 h-[calc(100vh-12rem)]">
            <Carousel slide={false}>
              {post.post.images.map((image) => (
                <div key={image.id} className="h-full w-full relative">
                  <Image
                    alt="Image"
                    src={image.url}
                    style={{ objectFit: 'contain' }}
                    fill
                    priority
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
