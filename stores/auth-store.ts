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
  setStatus: (status: Status) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'idle',

  signUp: async (credentials: SignUpCredentials) => {
    await authRepository.signUp(credentials)
    set({ status: 'authorized' })
  },

  signIn: async (credentials: SignInCredentials) => {
    await authRepository.signIn(credentials)
    set({ status: 'authorized' })
  },

  signOut: async () => {
    await authRepository.logout()
    set({ status: 'unauthorized' })
  },

  setStatus: (status: Status) => set({ status }),
}))
