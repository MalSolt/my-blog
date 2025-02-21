import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

const protectedRoutes = ['/profile']

export default async function middleware(req: NextRequest) {
  const session = await auth()
  console.log('middleware', session)
  if (protectedRoutes.includes(req.nextUrl.pathname)) {

    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    }
  }

  return NextResponse.next()
}
