import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './_components/theme-provider'
import { Sidebar } from './_components/sidebar'
import { CheckAuthProvider } from './_components/check-auth-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Refugee-blog',
  description: 'Refugee-blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background `}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <CheckAuthProvider>
            <div className='flex'>
              <Sidebar />
              <main className='flex-1 max-w-[600px] border-r'>{children}</main>
            </div>
          </CheckAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
