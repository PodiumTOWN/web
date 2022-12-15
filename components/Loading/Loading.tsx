import LoadingSVG from '../../public/icons/loading.svg'

export default function Loading() {
  return (
    <div className="flex justify-center py-8 w-full">
      <div className="w-6 h-6">
        <LoadingSVG />
      </div>
    </div>
  )
}
