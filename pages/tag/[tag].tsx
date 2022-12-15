import Head from 'next/head'
import { useRouter } from 'next/router'
import HashtagList from '../../components/HashtagList/HashtagList'

function TagPage() {
  const router = useRouter()
  const { tag } = router.query

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

      <HashtagList hashtag={tag as string} />
    </>
  )
}

export default TagPage
