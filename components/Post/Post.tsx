import Image from 'next/image'
import dayjs from 'dayjs'
import { Modal, Carousel, Dropdown } from 'flowbite-react'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import MoreSVG from '../../public/icons/more.svg'
import { IPostProfile } from '../../lib/posts'
import { IPostComment } from '../../lib/comments'
import { IProfile } from '../../lib/profile'

interface IPost {
  fromProfile?: IProfile | null
  post: IPostProfile | IPostComment
  variant?: string
  onDeletePost: (postId: string) => void
  onBlockPost: (postId: string) => void
  onReportPost: (postId: string) => void
  onBlockProfile: (id: string) => void
}

export default function Post({
  fromProfile,
  post,
  variant = 'base',
  onDeletePost,
  onBlockPost,
  onReportPost,
  onBlockProfile
}: IPost) {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onImage = (e: MouseEvent<HTMLElement>) => {
    setIsModalVisible(true)
    e.stopPropagation()
  }

  const onNavigatePost = (e: MouseEvent<HTMLElement>) => {
    if (router.query.id !== post.post.id) {
      router.push(`/post/${post.post.id}`)
      e.stopPropagation()
    }
  }

  const onNavigateProfile = (e: MouseEvent<HTMLElement>) => {
    if (router.query.id !== post.profile.username) {
      router.push(`/${post.profile.username}`)
      e.stopPropagation()
    }
  }

  return (
    <>
      <div className="relative flex w-full p-5 border-b-[1px] dark:border-b-zinc-900 transition ease-in-out md:hover:bg-gray-100 md:dark:hover:bg-zinc-900 cursor-pointer">
        <div
          onClick={onNavigateProfile}
          className="z-20 h-[52px] min-w-[52px] relative overflow-hidden mr-3 rounded-full bg-gray-100 dark:bg-zinc-900"
        >
          <Image
            priority
            alt="Avatar"
            src={post.profile.avatarUrl || '/dummy-avatar.png'}
            fill
            className="object-cover"
          />
        </div>
        <div
          onClick={onNavigatePost}
          className="absolute top-0 bottom-0 left-0 right-0 z-10"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div
              onClick={onNavigateProfile}
              className="z-20 font-semibold hover:underline"
            >
              {post.profile.username}
            </div>
            <div className="flex items-center text-sm z-100">
              <div className="text-gray-400 relative">
                {fromProfile && (
                  <Dropdown
                    label={
                      <div className="px-3 py-2 z-40 hover:text-black dark:hover:text-white">
                        <MoreSVG className="w-4 h-4" />
                      </div>
                    }
                    inline={true}
                    arrowIcon={false}
                  >
                    {fromProfile.id !== post.profile.id && (
                      <>
                        <Dropdown.Item onClick={() => onBlockPost(post.post.id)}>
                          Block post
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onReportPost(post.post.id)}>
                          Report post
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onBlockProfile(post.profile.id)}>
                          Block profile
                        </Dropdown.Item>
                      </>
                    )}
                    {post.profile.id === fromProfile?.id && (
                      <Dropdown.Item onClick={() => onDeletePost(post.post.id)}>
                        Delete post
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                )}
              </div>
              <div className="text-gray-400">
                {dayjs().to(dayjs(post.post.createdAt * 1000))}
              </div>
            </div>
          </div>
          <div
            onClick={onNavigatePost}
            className={`relative z-20 ${variant === 'big' ? 'text-2xl' : 'text-base'}`}
          >
            {post.post.text}
          </div>
          {post.post.images.length > 0 && (
            <div className="relative z-20 flex -mx-1 mt-2" onClick={onImage}>
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
          )}
        </div>
      </div>
      <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)} size="5xl">
        <Modal.Header />
        <Modal.Body color="secondary">
          <div className="space-y-6 h-[calc(100vh-10rem)]">
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
