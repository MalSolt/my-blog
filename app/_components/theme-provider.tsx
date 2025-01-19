'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true) // Ensures the theme is set only after client-side rendering
  }, [])

  if (!mounted) {
    return <div /> // Avoid hydration mismatch by returning nothing until mounted
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
