import PostList from '../PostList/PostList'

interface IHashtagList {
  hashtag: string
}

export default function HashtagList({ hashtag }: IHashtagList) {
  return (
    <>
      <div className="p-5 text-lg font-semibold">#{hashtag}</div>
      <PostList hashtag={hashtag} />
    </>
  )
}
