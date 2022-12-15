import Head from 'next/head'
import { useContext } from 'react'
import HashtagList from '../components/HashtagList/HashtagList'
import PostList from '../components/PostList/PostList'
import { AuthContext } from '../contexts/AuthContext/AuthContext'
import { PostsContext } from '../contexts/PostsContext/PostsContext'

function HomePage() {
  const { isLoading, profile } = useContext(AuthContext)
  const { posts } = useContext(PostsContext)

  return (
    <>
      <Head>
        <title>Podium — Open social network</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Open social network." />
        <meta property="og:description" content="Open social network" key="ogdesc" />
        <meta property="og:url" content="https://podium.town" key="ogurl" />
        <meta property="og:image" content="https://podium.town/logo.png" key="ogimage" />
        <meta
          property="og:site_name"
          content="Podium — Open social network"
          key="ogsitename"
        />
        <meta property="og:title" content="Open social network." key="ogtitle" />
      </Head>

      {!isLoading && !profile ? <HashtagList hashtag="welcome" /> : <PostList />}
    </>
  )
}

export default HomePage
