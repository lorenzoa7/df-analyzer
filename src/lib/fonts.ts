import { Quicksand as FontMono } from 'next/font/google'

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
})
