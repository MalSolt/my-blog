import { Editor } from './_components/editor/editor'

export default function Home() {
  return (
    <div className=''>
      <div className='p-4'>
        <h1 className='text-center text-2xl'>Welcome to the Refugee Blog</h1>
        <p>This is a platform where refugees can share their stories and experiences.</p>
      </div>
      <Editor />
    </div>
  )
}
