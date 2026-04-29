import type { Metadata, Viewport } from 'next'
import { Prompt } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { DynamicIntlProvider } from '@/lib/intl-provider'
import { ExitTransitionProvider } from '@/providers/exit-transition-provider'
import './globals.css'

const prompt = Prompt({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ['thai', 'latin'], 
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RubKianCode - รับผลิตซอฟต์แวร์ ราคาพิเศษ',
  description: 'บริษัท Rub Kian Code Co.,Ltd. รับผลิต ให้เช่า และปรึกษาการทำซอฟต์แวร์ทุกรูปแบบ รวมทั้งให้เช่าโปรแกรม Photobooth สไตล์เกาหลี',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#f2efdb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} font-sans antialiased`}>
        <LanguageProvider>
          <DynamicIntlProvider>
            <ExitTransitionProvider>
              {children}
            </ExitTransitionProvider>
          </DynamicIntlProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
