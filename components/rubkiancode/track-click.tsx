"use client"

// ════════════════════════════════════════════════════════════════════════
// TRACK CLICK — wrapper บางๆ ที่ทำหน้าที่ส่ง GA event ตอนคลิก children
// ════════════════════════════════════════════════════════════════════════
// ใช้สำหรับครอบปุ่ม CTA ในหน้า server component (เช่น service detail)
// โดยไม่ต้องเปลี่ยนทั้งหน้าให้เป็น client component
//
// ใช้ตัวอย่าง:
//   <TrackClick kind="cta" label="request_quote">
//     <Link href="/#contact">ขอใบเสนอราคา</Link>
//   </TrackClick>
//
// span display:contents ทำให้ DOM ไม่กระทบ layout
// ════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react"
import {
  trackCTAClick,
  trackContactClick,
  type ContactChannel,
  type ContactSource,
} from "@/lib/analytics"

type Props =
  | { kind: "cta"; label: string; source?: ContactSource; children: ReactNode }
  | { kind: "contact"; channel: ContactChannel; source?: ContactSource; children: ReactNode }

export function TrackClick(props: Props) {
  const source: ContactSource = props.source ?? "service_detail"
  const onClick = () => {
    if (props.kind === "cta") trackCTAClick(props.label, source)
    else trackContactClick(props.channel, source)
  }
  return (
    <span style={{ display: "contents" }} onClickCapture={onClick}>
      {props.children}
    </span>
  )
}
