// Video preview ที่รองรับ:
//   - string เดียว → ใช้ native <video loop> (เล่นวนไฟล์เดียว)
//   - array of string → เล่นไฟล์แรก → onEnded สลับไฟล์ถัดไป → วนกลับมา [0]
//   - loopsPerVideo: จำนวนรอบที่แต่ละไฟล์เล่นก่อนข้ามไปไฟล์ถัดไป (default 1)
//
// ใช้ใน card preview ของ Service ที่มี heroVideo
"use client"

import { useEffect, useRef, useState } from "react"

export function VideoLoopPreview({
  sources,
  className,
  ariaLabel,
  loopsPerVideo = 1,
}: {
  sources: string | string[]
  className?: string
  ariaLabel?: string
  loopsPerVideo?: number    // default 1 — ถ้า > 1 ให้แต่ละไฟล์เล่นซ้ำ N รอบก่อนเปลี่ยน
}) {
  const list = typeof sources === "string" ? [sources] : sources
  const isSingle = list.length === 1

  const [index, setIndex] = useState(0)
  const [playCount, setPlayCount] = useState(0)   // จำนวนรอบที่ไฟล์ปัจจุบันเล่นไปแล้ว
  const videoRef = useRef<HTMLVideoElement>(null)

  // เมื่อ index เปลี่ยน (sequence mode) — สั่ง play ไฟล์ใหม่ + reset playCount
  // browser autoPlay ทำงานเพราะเรา muted ไว้แล้ว แต่ catch error ไว้กัน edge case
  useEffect(() => {
    if (isSingle) return
    setPlayCount(0)
    const v = videoRef.current
    if (!v) return
    v.load()
    void v.play().catch(() => {})
  }, [index, isSingle])

  // Handler — ตัดสินใจว่าจะเล่นซ้ำหรือไปไฟล์ถัดไป
  const handleEnded = () => {
    if (isSingle) return
    const nextCount = playCount + 1
    if (nextCount < loopsPerVideo) {
      // เล่นซ้ำไฟล์เดิม — rewind + play (ไม่ต้องเปลี่ยน src)
      setPlayCount(nextCount)
      const v = videoRef.current
      if (v) {
        v.currentTime = 0
        void v.play().catch(() => {})
      }
    } else {
      // ครบรอบแล้ว → ไปไฟล์ถัดไป (useEffect จะ reset playCount = 0)
      setIndex((i) => (i + 1) % list.length)
    }
  }

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
      onEnded={isSingle ? undefined : handleEnded}
    />
  )
}
