'use server'

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '@/auth'

export const signIn = async () => {
  return nextAuthSignIn('github', { redirectTo: '/' })
}

export const signOut = async () => {
  return nextAuthSignOut({ redirectTo: '/' })
}
