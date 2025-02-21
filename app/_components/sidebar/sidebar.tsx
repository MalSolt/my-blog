import { Button } from '@/app/_components/ui/button'
import { signIn, signOut } from '@/shared/actions/auth'
import { Navigation } from './navigation'
import { User } from '../user'
import { auth } from '@/auth'

export const Sidebar = async () => {
  const session = await auth()
  

  return (
    <div className='min-h-screen w-[275px] border-r p-4 flex flex-col justify-between'>
      <Navigation />
      {session?.user ? (
        <Button onClick={signOut}>Sign Out</Button>
      ) : (
        <Button onClick={signIn}>Sign In</Button>
      )}
      <User />
    </div>
  )
}
