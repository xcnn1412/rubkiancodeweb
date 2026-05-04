import type { NavLinkItem } from "@/components/layout/navbar"

// Hash-anchor links to sections rendered on the RubKianCode homepage.
// labelKey is resolved against the "rubkiancode_navbar" translations namespace.
export const RUBKIANCODE_NAV_ITEMS: NavLinkItem[] = [
  { href: "#showcase", labelKey: "nav_portfolio" },
  { href: "#services", labelKey: "nav_services" },
  { href: "#photobooth", labelKey: "nav_product" },
  { href: "#contact", labelKey: "nav_contact" },
]
