import { auth } from '@/auth'
import { Editor } from './_components/editor/editor'

export default async function Home() {
  const session = await auth()
  console.log('page', session);


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
