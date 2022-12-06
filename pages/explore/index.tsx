import Image from 'next/image'

export default function Explore() {
  return (
    <div className="px-6 md:p-12 flex flex-col gap-6">
      <div className="">
        <input
          placeholder="Search..."
          type="text"
          className="p-4 bg-gray-100 w-full rounded-xl border-2 focus:border-black border-transparent outline-none"
        />
      </div>

      <div className="h-[16rem] overflow-hidden relative rounded-xl flex justify-center items-center">
        <Image src="/welcome.jpg" alt="Welcome" fill className="object-cover" />
        <div className="z-2 relative text-white">#welcome</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-md font-medium">🌎 Global trends</div>
        <div className="flex gap-2">
          <div className="bg-gray-100 px-3 py-2 rounded-full text-sm font-medium">
            #welcome
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded-full text-sm font-medium">
            #welcome
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded-full text-sm font-medium">
            #welcome
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-md font-medium flex justify-between">
          <span>💪 Active votings</span>
          <div className="text-gray-400 text-sm">How does it work ?</div>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-100 p-4 rounded-xl text-sm font-medium w-full flex justify-between">
            <div>Ban profile @bot123</div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                98%
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                28%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
