import { PropsWithChildren } from 'react'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
