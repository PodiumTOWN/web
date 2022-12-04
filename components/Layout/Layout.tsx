import { PropsWithChildren } from 'react'
import { DBContextProvider } from '../../contexts/DBContext/DBContext'
import { PostsContextProvider } from '../../contexts/PostsContext/PostsContext'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DBContextProvider>
      <PostsContextProvider>
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          {children}
        </div>
      </PostsContextProvider>
    </DBContextProvider>
  )
}
