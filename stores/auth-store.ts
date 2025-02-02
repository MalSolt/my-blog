import { SignInCredentials, SignUpCredentials } from '../services/auth-service'
import { create } from 'zustand'
import { authService } from '../services/auth-service'

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
    await authService.signUp(credentials)
    set({ status: 'authorized' })
  },

  signIn: async (credentials: SignInCredentials) => {
    await authService.signIn(credentials)
    set({ status: 'authorized' })
  },

  signOut: async () => {
    await authService.logout()
    set({ status: 'unauthorized' })
  },

  setStatus: (status: Status) => set({ status }),
}))
