import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { TextInput, Button } from 'flowbite-react'
import Post from '../../components/Post/Post'
import { addComment, getComments, IPostComment } from '../../lib/comments'
import { v4 as uuid } from 'uuid'
import { getPostMinimum, IPost } from '../../lib/posts'
import { getProfile, IProfile } from '../../lib/profile'
import BackSVG from '../../public/icons/arrow-left.svg'
import LoadingSVG from '../../public/icons/loading.svg'
import Image from 'next/image'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

interface IPostPage {
  post: IPost
}

function PostPage({ post }: IPostPage) {
  const { profile: fromProfile } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [comments, setComments] = useState<IPostComment[] | null>(null)
  const [profile, setProfile] = useState<IProfile | null>(null)
  const [commentText, setCommentText] = useState('')
  const title = profile ? `Podium — Post by ${profile.username}` : 'Podium — Post'

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const result = await getProfile(post.ownerId)
      setProfile(result)

      const comments = await getComments(post.id)
      setComments(comments)
      setIsLoading(false)
    }

    getData()
  }, [post])

  const Loading = () => (
    <div className="flex justify-center py-8 w-full">
      <div className="w-6 h-6">
        <LoadingSVG />
      </div>
    </div>
  )

  const sendComment = async () => {
    const comment: IPostComment = {
      post: {
        id: uuid(),
        ownerId: fromProfile!.id,
        text: commentText,
        postId: post.id,
        createdAt: Math.round(Date.now() / 1000),
        hashtags: [],
        images: []
      },
      profile: fromProfile!
    }

    if (comments) {
      setComments([comment, ...comments])
    } else {
      setComments([comment])
    }
    await addComment(comment)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${post.text}`} />
        <meta property="og:description" content={`${post.text}`} key="ogdesc" />
        <meta
          property="og:url"
          content={`https://podium.town/post/${post.id}`}
          key="ogurl"
        />
        <meta property="og:image" content="https://podium.town/logo.png" key="ogimage" />
        <meta
          property="og:site_name"
          content="Podium — Open social network"
          key="ogsitename"
        />
        <meta property="og:title" content={`${title}`} key="ogtitle" />
      </Head>

      <div className="w-full md:max-w-2xl md:border-r-[1px] dark:border-zinc-900 h-full">
        <div className="py-2 px-4">
          <div className="cursor-pointer w-8 h-8" onClick={() => router.back()}>
            <BackSVG className="w-full" />
          </div>
        </div>

        {profile && <Post post={{ post, profile }} variant="big" />}

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="px-5 my-4 flex gap-2 items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={fromProfile?.avatarUrl || '/dummy-avatar.png'}
                  fill
                  alt="You"
                  className="object-cover"
                />
              </div>
              <TextInput
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                color="primary"
                placeholder="What's on your mind ?"
                className="flex-1"
              />
              <Button
                color="primary"
                onClick={sendComment}
                disabled={commentText.length < 4}
              >
                Send
              </Button>
            </div>
            {comments?.map((comment) => (
              <Post key={comment.post.id} post={comment} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

PostPage.getInitialProps = async (context: GetServerSidePropsContext) => {
  const id = context.query.id
  const post = await getPostMinimum(id as string)

  return { post }
}

export default PostPage
