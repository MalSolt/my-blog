'use client'

import { useAuthStore } from '@/stores/auth-store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function CheckAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { status, me } = useAuthStore()

  useEffect(() => {
    me()
  }, [me])

  useEffect(() => {
    if (status === 'authorized' && pathname.startsWith('/auth')) {
      router.push('/')
    }

    if (status === 'unauthorized' && !pathname.startsWith('/auth')) {
      router.push('/auth/sign-in')
    }
  }, [router, pathname, status])

  if (status === 'idle') return <p>Loading...</p>

  if (status === 'unauthorized' && !pathname.startsWith('/auth')) {
    return <p>Loading...</p>
  }

  if (status === 'authorized' && pathname.startsWith('/auth')) {
    return <p>Loading...</p>
  }

  return children
}
