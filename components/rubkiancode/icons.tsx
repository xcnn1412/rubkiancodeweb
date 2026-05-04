// ไอคอนพิกเซลที่ใช้ร่วมกันหลาย ๆ section
// — BrandLogo: โลโก้ rubkiancode (ปุ่ม + คนสองคน)
// — ArrowIcon: ลูกศรชี้ขวาสำหรับปุ่ม CTA

export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`pixel-svg ${className ?? ""}`}>
      <g fill="currentColor">
        <rect x="2" y="2" width="2" height="2" />
        <rect x="4" y="4" width="2" height="2" />
        <rect x="6" y="6" width="2" height="2" />
        <rect x="4" y="8" width="2" height="2" />
        <rect x="2" y="10" width="2" height="2" />
        <rect x="9" y="10" width="2" height="2" />
        <rect x="11" y="10" width="2" height="2" />
      </g>
    </svg>
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
