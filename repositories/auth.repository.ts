import axios from 'axios'
import { api } from './api-client'

export type User = {
  id: string
  email: string
  username: string
}

export type SignUpCredentials = {
  username: User['username']
  email: User['email']
  password: string
}

export type SignInCredentials = Pick<SignUpCredentials, 'email' | 'password'>

export const authRepository = {
  signUp: async (credentials: SignUpCredentials) => {
    return api.post('/auth/signUp', credentials)
  },

  signIn: async (credentials: SignInCredentials) => {
    return api.post('/auth/signIn', credentials)
  },

  logout: async () => {
    return api.post('/auth/signOut')
  },

  refreshToken: async () => {
    return axios.post('http://localhost:5000/auth/refresh', null, { withCredentials: true })
  },
}
