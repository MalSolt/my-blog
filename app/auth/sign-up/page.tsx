'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'next/navigation'
import { SignUpCredentials } from '@/repositories/auth.repository'

type Form = SignUpCredentials

const SignUpPage = () => {
  const signUp = useAuthStore((state) => state.signUp)
  const router = useRouter()
  const [form, setForm] = useState<Form>({ username: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(form)
    router.push('/')
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
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
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage
