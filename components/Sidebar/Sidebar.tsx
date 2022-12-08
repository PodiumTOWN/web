import Link from 'next/link'
import { useContext } from 'react'
import { DarkThemeToggle } from 'flowbite-react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import SignIn from '../SignIn/SignIn'
import LogoSVG from '../../public/logo.svg'
import HomeSVG from '../../public/icons/home.svg'
import SearchSVG from '../../public/icons/search.svg'
import MessagesSVG from '../../public/icons/messages.svg'
import ProfileSVG from '../../public/icons/profile.svg'

export default function Sidebar() {
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-black md:h-screen sticky top-0 md:border-r-[1px] dark:border-zinc-800 z-20 md:w-1/3 md:min-w-[310px] md:max-w-sm">
      <div className="min-h-[76px] flex flex-row md:flex-col md:justify-start justify-between pl-5 pr-2 items-center md:items-start md:pt-24">
        <Link href="/" className="md:pl-16 md:mb-6 text-black dark:text-white">
          <LogoSVG className="w-8 h-8" />
        </Link>

        {!isLoading && (
          <>
            {isAuthenticated ? (
              <ul className="md:px-12 py-4 md:py-6 flex flex-row md:flex-col gap-2">
                <li>
                  <Link
                    href="/"
                    className="flex items-center p-2 md:p-4 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-2xl cursor-pointer transition ease-in-out"
                  >
                    <div className="flex justify-center md:mr-4">
                      <HomeSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore"
                    className="flex items-center p-2 md:p-4 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-2xl cursor-pointer transition ease-in-out"
                  >
                    <div className="flex justify-center md:mr-4 w-8">
                      <SearchSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Explore</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/messages"
                    className="flex items-center p-2 md:p-4 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-2xl cursor-pointer transition ease-in-out"
                  >
                    <div className="flex justify-center md:mr-4 w-8">
                      <MessagesSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Messages</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center p-2 md:p-4 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-2xl cursor-pointer transition ease-in-out"
                  >
                    <div className="flex justify-center md:mr-4 w-8">
                      <ProfileSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Profile</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <SignIn />
            )}
          </>
        )}
      </div>
      <div>
        <DarkThemeToggle className="hidden md:block mx-8 hover:bg-transparent dark:hover:bg-transparent p-0" />
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
    </div>
  )
}
