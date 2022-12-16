import PostList from '../PostList/PostList'

interface IHashtagList {
  hashtag: string
}

export default function HashtagList({ hashtag }: IHashtagList) {
  return (
    <div className="w-full md:max-w-2xl md:border-r-[1px] h-full dark:md:border-r-zinc-900">
      <div className="p-5 text-lg font-semibold">#{hashtag}</div>
      <PostList hashtag={hashtag} />
    </div>
  )
}
