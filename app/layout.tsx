import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AI Weather App',
    template: '%s | AI Weather App',
  },
  applicationName: 'AI Weather App',
  description: 'AI‑assisted forecasts with charts and summaries for any location.',
  keywords: ['weather', 'forecast', 'Open‑Meteo', 'StepZen', 'Next.js', 'OpenAI', 'charts'],
  category: 'weather',
  generator: 'Next.js',
  themeColor: '#0ea5e9',
  colorScheme: 'light',
  openGraph: {
    title: 'AI Weather App',
    description: 'AI‑assisted forecasts with charts and summaries for any location.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Weather App',
    description: 'AI‑assisted forecasts with charts and summaries for any location.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
