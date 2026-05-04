import type { Metadata, Viewport } from 'next'
import { Prompt, Press_Start_2P, VT323 } from 'next/font/google'
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

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixelify',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RubKianCode - รับผลิตซอฟต์แวร์ ราคาพิเศษ',
  description: 'บริษัท Rub Kian Code Co.,Ltd. รับผลิต ให้เช่า และปรึกษาการทำซอฟต์แวร์ทุกรูปแบบ รวมทั้งให้เช่าโปรแกรม Photobooth สไตล์เกาหลี',
  generator: 'v0.app',
  icons: {
    icon: '/rubkiancode-icon.png',
    shortcut: '/rubkiancode-icon.png',
    apple: '/rubkiancode-icon.png',
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
      <body className={`${prompt.variable} ${pressStart.variable} ${vt323.variable} font-sans antialiased`}>
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
