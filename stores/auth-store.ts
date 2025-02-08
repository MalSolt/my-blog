import {
  SignInCredentials,
  SignUpCredentials,
  authRepository,
} from '../repositories/auth.repository'
import { create } from 'zustand'

type Status = 'idle' | 'authorized' | 'unauthorized'

interface AuthState {
  status: Status
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  me: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',

  signUp: async (credentials: SignUpCredentials) => {
    try {
      await authRepository.signUp(credentials)
      set({ status: 'authorized' })
    } catch (error) {
      console.log(error)
    }
  },

  signIn: async (credentials: SignInCredentials) => {
    try {
      await authRepository.signIn(credentials)
      set({ status: 'authorized' })
    } catch (error) {
      console.log(error)
    }
  },

  signOut: async () => {
    try {
      await authRepository.logout()
      set({ status: 'unauthorized' })
    } catch (error) {
      console.log(error)
    }
  },

  me: async () => {
    try {
      await authRepository.me()
      set({ status: 'authorized' })
    } catch (error) {
      set({ status: 'unauthorized' })
      console.log(error)
    }
  },
}))
