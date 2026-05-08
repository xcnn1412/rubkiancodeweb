// Video preview ที่รองรับ:
//   - string เดียว → ใช้ native <video loop> (เล่นวนไฟล์เดียว)
//   - array of string → เล่นไฟล์แรก → onEnded สลับไฟล์ถัดไป → วนกลับมา [0]
//
// ใช้ใน card preview ของ Service ที่มี heroVideo
"use client"

import { useEffect, useRef, useState } from "react"

export function VideoLoopPreview({
  sources,
  className,
  ariaLabel,
}: {
  sources: string | string[]
  className?: string
  ariaLabel?: string
}) {
  const list = typeof sources === "string" ? [sources] : sources
  const isSingle = list.length === 1

  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // เมื่อ index เปลี่ยน (sequence mode) — สั่ง play ไฟล์ใหม่
  // browser autoPlay ทำงานเพราะเรา muted ไว้แล้ว แต่ catch error ไว้กัน edge case
  useEffect(() => {
    if (isSingle) return
    const v = videoRef.current
    if (!v) return
    v.load()
    void v.play().catch(() => {})
  }, [index, isSingle])

  return (
    <video
      ref={videoRef}
      src={list[index]}
      autoPlay
      muted
      loop={isSingle}
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
      className={className}
      onEnded={
        isSingle
          ? undefined
          : () => setIndex((i) => (i + 1) % list.length)
      }
    />
  )
}
