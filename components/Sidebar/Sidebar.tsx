import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import SignIn from '../SignIn/SignIn'

interface ISidebar {
  isAuthenticated: boolean
}

export default function Sidebar() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="flex flex-col justify-between bg-white md:h-screen sticky top-0 md:border-r-[1px] z-20 md:w-1/3 md:min-w-[310px] md:max-w-sm">
      <div className="flex flex-row md:flex-col md:justify-start justify-between pl-5 pr-2 items-center md:items-start md:pt-24">
        <Link href="/" className="md:pl-16 md:mb-6">
          <Image alt="Home" src="/logo.svg" height={30} width={30} className="pl-1" />
        </Link>

        {isAuthenticated ? (
          <ul className="md:px-12 py-4 md:py-6 flex flex-row md:flex-col gap-2">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 md:p-4 hover:bg-gray-100 rounded-2xl cursor-pointer transition ease-in-out"
              >
                <div className="flex justify-center md:mr-4 w-8">
                  <Image alt="Home" src="/icons/home.svg" height={30} width={30} />
                </div>
                <span className="hidden md:block">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="flex items-center p-2 md:p-4 hover:bg-gray-100 rounded-2xl cursor-pointer transition ease-in-out"
              >
                <div className="flex justify-center md:mr-4 w-8">
                  <Image alt="Home" src="/icons/search.svg" height={30} width={30} />
                </div>
                <span className="hidden md:block">Explore</span>
              </Link>
            </li>
            <li>
              <Link
                href="/messages"
                className="flex items-center p-2 md:p-4 hover:bg-gray-100 rounded-2xl cursor-pointer transition ease-in-out"
              >
                <div className="flex justify-center md:mr-4 w-8">
                  <Image alt="Home" src="/icons/messages.svg" height={30} width={30} />
                </div>
                <span className="hidden md:block">Messages</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center p-2 md:p-4 hover:bg-gray-100 rounded-2xl cursor-pointer transition ease-in-out"
              >
                <div className="flex justify-center md:mr-4 w-8">
                  <Image alt="Home" src="/icons/profile.svg" height={30} width={30} />
                </div>
                <span className="hidden md:block">Profile</span>
              </Link>
            </li>
          </ul>
        ) : (
          <SignIn />
        )}
      </div>
      <div className="hidden md:flex justify-center p-8 gap-4 text-gray-300 text-xs">
        <Link href="/terms" className="hover:text-gray-400">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-gray-400">
          Privacy
        </Link>
        Copyright 2022 Podium
      </div>
    </div>
  )
}
