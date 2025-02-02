import axios from 'axios'
import { authService } from './auth-service'

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
        await authService.refreshToken()
        return api(originalRequest)
      } catch (refreshError) {
        console.log('Session expired, logging out...', refreshError)
        authService.logout()
      }
    }
    return Promise.reject(error)
  }
)
