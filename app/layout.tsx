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

const SITE_URL = 'https://rubkiancode.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RubKianCode — รับเขียนซอฟต์แวร์ SME ไทย เริ่มต้น 35,000 บาท/ปี',
    template: '%s | RubKianCode',
  },
  description:
    'บริษัท รับเขียนโค้ด จำกัด — รับพัฒนาซอฟต์แวร์ครบวงจรสำหรับ SME ไทย: Marketing System, Office ERP, Lucky Draw และ Photobooth Software เริ่มต้น 35,000 บาท/ปี จดทะเบียนพาณิชย์ถูกต้อง',
  keywords: [
    'รับเขียนโปรแกรม',
    'รับทำซอฟต์แวร์',
    'รับเขียนโค้ด',
    'พัฒนาเว็บไซต์',
    'Marketing System',
    'Office ERP',
    'Lucky Draw',
    'Photobooth Software',
    'SME ซอฟต์แวร์',
    'RubKianCode',
    'รับเขียนเว็บ Next.js',
  ],
  authors: [{ name: 'บริษัท รับเขียนโค้ด จำกัด', url: SITE_URL }],
  creator: 'RubKianCode',
  publisher: 'บริษัท รับเขียนโค้ด จำกัด',
  applicationName: 'RubKianCode',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: SITE_URL,
    siteName: 'RubKianCode',
    title: 'RubKianCode — รับเขียนซอฟต์แวร์ SME ไทย เริ่มต้น 35,000 บาท/ปี',
    description:
      'รับพัฒนา Marketing System, Office ERP, Lucky Draw, Photobooth Software ครบวงจรสำหรับ SME ไทย',
    images: [
      {
        url: '/images/icon-rubkiancode.svg',
        width: 1040,
        height: 1040,
        alt: 'RubKianCode logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RubKianCode — รับเขียนซอฟต์แวร์ SME ไทย',
    description:
      'รับพัฒนาซอฟต์แวร์ครบวงจร Marketing / ERP / Lucky Draw / Photobooth — เริ่มต้น 35,000 บาท/ปี',
    images: ['/images/icon-rubkiancode.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/icon-rubkiancode.svg',
    shortcut: '/images/icon-rubkiancode.svg',
    apple: '/images/icon-rubkiancode.svg',
  },
}

// Organization JSON-LD — ช่วย Google รู้จักบริษัท + แสดง knowledge panel
const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'บริษัท รับเขียนโค้ด จำกัด',
  alternateName: ['RubKianCode', 'Rub Kian Code Co., Ltd.'],
  url: SITE_URL,
  logo: `${SITE_URL}/images/icon-rubkiancode.svg`,
  foundingDate: '2026-02-27',
  legalName: 'บริษัท รับเขียนโค้ด จำกัด',
  taxID: '0105569041779',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '91 ซอย เฉลิมพระเกียรติ ร.๙ ซ.14',
    addressLocality: 'แขวงดอกไม้',
    addressRegion: 'เขตประเวศ กรุงเทพมหานคร',
    addressCountry: 'TH',
  },
  sameAs: [
    'https://datawarehouse.dbd.go.th/company/profile/50105569041779',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Thai', 'English'],
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
      <head>
        {/* JSON-LD: Organization schema — ช่วย Google สร้าง knowledge panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </head>
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
