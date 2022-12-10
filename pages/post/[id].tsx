import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getComments } from '../../lib/comments'
import { getPostMinimum, IPost } from '../../lib/posts'
import { getProfile, IProfile } from '../../lib/profile'
import BackSVG from '../../public/icons/arrow-left.svg'
import LoadingSVG from '../../public/icons/loading.svg'

interface IPostPage {
  post: IPost
}

function PostPage({ post }: IPostPage) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [comments, setComments] = useState<any[] | null>(null)
  const [profile, setProfile] = useState<IProfile | null>(null)
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
          comments?.map((comment) => <Post key={comment.post.id} post={comment} />)
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
