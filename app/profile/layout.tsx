import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Profile Page',
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
