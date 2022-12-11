import Link from 'next/link'
import { useContext, useState } from 'react'
import { DarkThemeToggle, Modal, Button, Textarea } from 'flowbite-react'
import { AuthContext } from '../../contexts/AuthContext/AuthContext'
import SignIn from '../SignIn/SignIn'
import LogoSVG from '../../public/logo.svg'
import HomeSVG from '../../public/icons/home.svg'
import SearchSVG from '../../public/icons/search.svg'
import MessagesSVG from '../../public/icons/messages.svg'
import ProfileSVG from '../../public/icons/profile.svg'
import AddSVG from '../../public/icons/add.svg'
import SendSVG from '../../public/icons/send.svg'
import MediaSVG from '../../public/icons/media.svg'
import Image from 'next/image'
import Register from '../Register/Register'
import { PostsContext } from '../../contexts/PostsContext/PostsContext'

export default function Sidebar() {
  const { isAuthenticated, isLoading, profile } = useContext(AuthContext)
  const { send } = useContext(PostsContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false)
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false)
  const [text, setText] = useState('')

  const onRegistered = () => {
    setIsRegisterModalVisible(false)
    setIsSignInModalVisible(true)
  }

  const onSendPost = async () => {
    await send(text)
    setText('')
    setIsModalVisible(false)
  }

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-black md:h-screen sticky top-0 md:border-r-[1px] dark:border-zinc-900 z-50 md:w-1/3 md:min-w-[310px] md:max-w-sm mb-1 md:mb-0">
      <div className="min-h-[76px] flex flex-row md:flex-col md:justify-start justify-between px-5 items-center md:items-start md:pt-24">
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
                    <div className="flex justify-center md:mr-4 w-7">
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
                    <div className="flex justify-center md:mr-4 w-7">
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
                    <div className="flex justify-center md:mr-4 w-7">
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
                    <div className="flex justify-center md:mr-4 w-7">
                      <ProfileSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Profile</span>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={() => setIsModalVisible(true)}
                    className="flex p-2 md:p-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl cursor-pointer transition ease-in-out"
                  >
                    <div className="flex justify-center md:mr-4 w-8">
                      <AddSVG className="w-7 h-7" />
                    </div>
                    <span className="hidden md:block">Create</span>
                  </div>
                  <Modal show={isModalVisible} onClose={() => setIsModalVisible(false)}>
                    <Modal.Header>What&apos;s on your mind ?</Modal.Header>
                    <Modal.Body>
                      <div className="flex gap-2 sm:gap-4 p-4 md:p-0">
                        <div className="h-12 w-12 sm:h-16 sm:w-16 overflow-hidden relative rounded-full bg-gray-100 dark:bg-zinc-900">
                          <Image
                            src={profile?.avatarUrl || '/dummy-avatar.png'}
                            fill
                            alt="Avatar"
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <span className="font-medium">{profile?.username}</span>
                          <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            color="primary"
                            placeholder="Share something..."
                            className="text-lg"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 pb-4 md:px-0 md:pt-4">
                        <Button color="secondary">
                          <div className="w-5">
                            <MediaSVG />
                          </div>
                        </Button>
                        <Button
                          color="primary"
                          disabled={text.length < 3}
                          onClick={onSendPost}
                        >
                          <div>Send</div>
                          <div className="w-5 ml-1">
                            <SendSVG />
                          </div>
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </li>
              </ul>
            ) : (
              <div className="flex justify-center md:px-16 md:my-8">
                <Button color="primary" onClick={() => setIsSignInModalVisible(true)}>
                  Sign In
                </Button>
                <SignIn
                  show={isSignInModalVisible}
                  onClose={() => setIsSignInModalVisible(false)}
                  onRegister={() => {
                    setIsSignInModalVisible(false)
                    setIsRegisterModalVisible(true)
                  }}
                />
                <Register
                  onRegistered={onRegistered}
                  show={isRegisterModalVisible}
                  onClose={() => setIsRegisterModalVisible(false)}
                  onSignIn={() => {
                    setIsSignInModalVisible(true)
                    setIsRegisterModalVisible(false)
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="max-w-xs mx-auto">
        <DarkThemeToggle className="hidden md:block mx-6 hover:bg-transparent dark:hover:bg-transparent p-0" />
        <div className="hidden md:flex justify-between p-8 gap-4 text-gray-300 text-xs">
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
