import { PropsWithChildren } from 'react'
import { AuthContextProvider } from '../../contexts/AuthContext/AuthContext'
import { PostsContextProvider } from '../../contexts/PostsContext/PostsContext'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <div className="w-full">{children}</div>
        </div>
      </PostsContextProvider>
    </AuthContextProvider>
  )
}
