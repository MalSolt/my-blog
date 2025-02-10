import axios from 'axios'
import { authRepository } from './auth.repository'

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await authRepository.refreshToken()
        return api(originalRequest)
      } catch (refreshError) {
        console.log('Session expired, logging out...', refreshError)
        authRepository.logout()
      }
    }
    return Promise.reject(error)
  }
)
