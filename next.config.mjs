import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  turbopack: {
    root: __dirname,
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
