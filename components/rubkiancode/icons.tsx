// ไอคอนที่ใช้ร่วมกันหลาย ๆ section
// — BrandLogo: โลโก้ rubkiancode SVG (จาก /public/images/icon-rubkiancode.svg)
// — ArrowIcon: ลูกศรชี้ขวาสำหรับปุ่ม CTA

export function BrandLogo({ className }: { className?: string }) {
  // ใช้ <img> เพราะ SVG มี viewBox + อยากให้ render ได้ทุกขนาดผ่าน className
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/images/icon-rubkiancode.svg"
      alt=""
      aria-hidden="true"
      className={`pixel-svg ${className ?? ""}`}
    />
  )
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`pixel-svg ${className ?? ""}`} fill="currentColor">
      <rect x="2" y="7" width="8" height="2" />
      <rect x="8" y="5" width="2" height="2" />
      <rect x="10" y="7" width="2" height="2" />
      <rect x="8" y="9" width="2" height="2" />
    </svg>
  )
}
