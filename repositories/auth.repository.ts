import axios from 'axios'
import { api } from './api'
import { z } from 'zod'
import { SignInSchema, SignUpSchema } from '@/shared/schemas'
import { User } from '@/shared/types'

export type SignUpCredentials = Omit<z.infer<typeof SignUpSchema>, 'confirmPassword'>
export type SignInCredentials = z.infer<typeof SignInSchema>

export const authRepository = {
  signUp: async (credentials: SignUpCredentials): Promise<User> => {
    const { data: user } = await api.post<User>('/auth/signUp', credentials)
    return user
  },

  signIn: async (credentials: SignInCredentials): Promise<User> => {
    const { data: user } = await api.post<User>('/auth/signIn', credentials)
    return user
  },

  signOut: async () => {
    return api.post('/auth/signOut')
  },

  refreshToken: async () => {
    return axios.post('http://localhost:5000/auth/refresh', null, { withCredentials: true })
  },

  me: async (): Promise<User> => {
    const { data: user } = await axios.post<User>('http://localhost:5000/auth/me', null, {
      withCredentials: true,
    })
    return user
  },
}
