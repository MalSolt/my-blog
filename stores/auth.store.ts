import { User } from '@/shared/types'
import {
  SignInCredentials,
  SignUpCredentials,
  authRepository,
} from '../repositories/auth.repository'
import { create } from 'zustand'

type Status = 'idle' | 'authorized' | 'unauthorized'

interface AuthState {
  user: User | null
  status: Status
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  me: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',

  signUp: async (credentials: SignUpCredentials) => {
    try {
      const user = await authRepository.signUp(credentials)
      set({ status: 'authorized', user })
    } catch (error) {
      console.log(error)
    }
  },

  signIn: async (credentials: SignInCredentials) => {
    try {
      const user = await authRepository.signIn(credentials)
      set({ status: 'authorized', user })
    } catch (error) {
      console.log(error)
    }
  },

  signOut: async () => {
    try {
      await authRepository.signOut()
      set({ status: 'unauthorized', user: null })
    } catch (error) {
      console.log(error)
    }
  },

  me: async () => {
    try {
      const user = await authRepository.me()
      set({ status: 'authorized', user })
    } catch (error) {
      set({ status: 'unauthorized', user: null })
      console.log(error)
    }
  },
}))
