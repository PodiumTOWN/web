import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Post from '../../components/Post/Post'
import SignIn from '../../components/SignIn/SignIn'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'

function Login() {
  const router = useRouter()
  const { auth, logOut, user, userPosts } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Podium — Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex flex-col gap-6 w-full md:max-w-2xl md:border-r-[1px] h-full">
        <SignIn />
      </div>
    </>
  )
}

export default Login
