import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,                      // gzip/brotli HTML responses
  poweredByHeader: false,              // ลบ X-Powered-By: Next.js (small header trim)
  reactStrictMode: true,
  productionBrowserSourceMaps: false,  // ลด bundle ใน production
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  turbopack: {
    root: __dirname,
  },
  // ── Long-term cache headers สำหรับ static assets ──
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  // Legacy URL redirects — เก็บไว้ตลอด เพื่อรักษา link เก่าที่ shared / bookmark ไว้แล้ว
  async redirects() {
    return [
      {
        source: '/photoboothsoftware',
        destination: '/services/photoboothsoftware',
        permanent: true, // 308 — บอก Google ว่าย้ายถาวร
      },
    ]
  },
}

export default nextConfig
