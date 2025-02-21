'use client'

import { Home, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { cn } from '@/app/_components/utils'
import Link from 'next/link'

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

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-col space-y-4'>
      <div className='text-xl font-bold'>My App</div>
      <ul className='space-y-2'>
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} isActive={pathname === item.href} />
        ))}
      </ul>
    </nav>
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
