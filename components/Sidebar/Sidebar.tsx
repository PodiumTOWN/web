import Image from 'next/image'

export default function Sidebar() {
  return (
    <div className="bg-white md:h-screen sticky top-0 md:border-r-[1px] flex flex-row md:flex-col justify-between md:justify-start z-20">
      <div className="md:ml-16 md:mr-28 ml-8 mt-10 md:mb-6 md:mt-16 w-8">
        <Image alt="Home" src="/logo.svg" height={30} width={30} />
      </div>
      <ul className="md:pl-12 md:pr-28 py-6 flex px-8 flex-row md:flex-col gap-2">
        <li className="flex p-4 items-center">
          <div className="md:mr-4 w-8">
            <Image alt="Home" src="/icons/home.svg" height={30} width={30} />
          </div>
          <span className="hidden md:block">Home</span>
        </li>
        <li className="flex p-4 items-center">
          <div className="md:mr-4 w-8">
            <Image alt="Home" src="/icons/search.svg" height={30} width={30} />
          </div>
          <span className="hidden md:block">Explore</span>
        </li>
        <li className="flex p-4 items-center">
          <div className="md:mr-4 w-8">
            <Image alt="Home" src="/icons/messages.svg" height={30} width={30} />
          </div>
          <span className="hidden md:block">Messages</span>
        </li>
        <li className="flex p-4 items-center">
          <div className="md:mr-4 w-8">
            <Image alt="Home" src="/icons/profile.svg" height={30} width={30} />
          </div>
          <span className="hidden md:block">Profile</span>
        </li>
      </ul>
    </div>
  )
}
