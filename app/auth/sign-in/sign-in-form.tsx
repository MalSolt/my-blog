'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { SignInSchema } from '@/shared/schemas'
import { useAuthStore } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type SignInForm = z.infer<typeof SignInSchema>

export const SignInForm = () => {
  const signIn = useAuthStore((state) => state.signIn)
  const router = useRouter()
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (values: SignInForm) => {
    await signIn({
      email: values.email,
      password: values.password,
    })
    form.reset()
    router.push('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={form.formState.isSubmitting} className='w-full'>
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  )
}
