'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { Home, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

type NavItemProps = {
  icon: FC<{ className?: string }>
  label: string
  href: string
  isActive: boolean
}

const navItems: Omit<NavItemProps, 'isActive'>[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export const Sidebar = () => {
  const signOut = useAuthStore((state) => state.signOut)
  const pathname = usePathname()

  return (
    <div className='min-h-screen w-[275px] border-r p-4 flex flex-col justify-between'>
      <nav className='flex flex-col space-y-4'>
        <div className='text-xl font-bold'>My App</div>
        <ul className='space-y-2'>
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} isActive={pathname === item.href} />
          ))}
        </ul>
      </nav>
      <Button onClick={signOut}>Sign Out</Button>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src='/profile-pic.jpg' alt='Profile Picture' />
          <AvatarFallback>DB</AvatarFallback>
        </Avatar>
        <div>
          <p className='font-semibold text-sm leading-none'>Davide Biscuso</p>
          <p className='text-xs text-placeholder'>@biscuttu</p>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ icon: Icon, label, href, isActive }: NavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={cn('flex items-center space-x-3 p-2 rounded-lg transition hover:text-primary', {
          'text-primary': isActive,
        })}
      >
        <Icon className='h-5 w-5' />
        <span>{label}</span>
      </Link>
    </li>
  )
}
