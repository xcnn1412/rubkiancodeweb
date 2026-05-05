import type { MetadataRoute } from "next"
import { SERVICES } from "./services/_data/services"

const SITE_URL = "https://rubkiancode.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]

  // Service detail pages — auto-generated จาก central data
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: s.featured ? 0.9 : 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
