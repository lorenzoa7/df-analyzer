import Header from '@/components/header'
import { siteConfig } from '@/config/site'
import { fontMono } from '@/lib/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden bg-slate-100 font-mono text-slate-900 antialiased ${fontMono.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
