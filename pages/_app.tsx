import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Flowbite } from 'flowbite-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AuthProvider } from '../contexts/AuthContext/AuthContext'
import { PostsContextProvider } from '../contexts/PostsContext/PostsContext'
import Layout from '../components/Layout/Layout'
import theme from '../utils/theme'
import { SettingsContextProvider } from '../contexts/SettingsContext/SettingsContext'

dayjs.extend(relativeTime)

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SettingsContextProvider>
        <PostsContextProvider>
          <Flowbite theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Flowbite>
        </PostsContextProvider>
      </SettingsContextProvider>
    </AuthProvider>
  )
}

export default App
