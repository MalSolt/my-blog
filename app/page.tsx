import { usePostStore } from '@/stores/post.store'
import { Editor } from './_components/editor/editor'

export default function Home() {
  const posts = usePostStore((state) => state.posts)
  console.log(posts)

  return (
    <div className=''>
      <div className='p-4'>
        <h1 className='text-center text-2xl'>Welcome to the My Blog</h1>
        <p>This is a platform where people can share their stories and experiences.</p>
      </div>
      <Editor />
    </div>
  )
}
