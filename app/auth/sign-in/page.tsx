'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { SignInCredentials } from '@/repositories/auth.repository'
import { useRouter } from 'next/navigation'

type Form = SignInCredentials

const SignInPage = () => {
  const signIn = useAuthStore((state) => state.signIn)
  const router = useRouter()
  const [form, setForm] = useState<Form>({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(form)
    router.push('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default SignInPage
