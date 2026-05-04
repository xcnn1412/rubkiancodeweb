import type { NavLinkItem } from "@/components/layout/navbar"

// Hash-anchor links to sections rendered on the photobooth page.
// labelKey is resolved against the "navbar" translations namespace.
export const PHOTOBOOTH_NAV_ITEMS: NavLinkItem[] = [
  { href: "#showcase", labelKey: "nav_rental" },
  { href: "#services", labelKey: "nav_software" },
  { href: "#photobooth", labelKey: "nav_photobooth" },
  { href: "#contact", labelKey: "nav_contact" },
]
