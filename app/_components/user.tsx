import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar'
import { auth } from '@/auth'

export const User = async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <div className='flex items-center gap-2'>
      <Avatar>
        <AvatarImage src={`${session.user.image}`} alt='Profile Picture' />
        <AvatarFallback>DB</AvatarFallback>
      </Avatar>
      <div>
        <p className='font-semibold text-sm leading-none'>{session.user.name}</p>
        <p className='text-xs text-placeholder'>{session.user.email}</p>
      </div>
    </div>
  )
}
