// ============================================================
//  Photobooth Preview Photos — Slideshow บนกรอบ TV Mockup
//  ============================================================
//  วิธีใช้:
//    - ใส่ path รูปภาพที่ src (เริ่มต้นจาก /  = public folder)
//    - ใส่ได้กี่รูปก็ได้ — จะสลับไปเรื่อยๆ เป็น slideshow
//    - ปรับเวลาสลับรูปได้ที่ PHOTOBOOTH_SLIDESHOW_DELAY_MS
//    - ถ้าใส่ src เป็น "" (ว่าง) จะแสดง placeholder icon กล้อง
//    - alt คือคำอธิบายรูป (ใส่ไว้เพื่อ accessibility / SEO)
//    - label คือข้อความ badge ที่จะแสดงบนรูป (เช่น "BEFORE" / "AFTER")
//      ถ้าไม่ใส่ จะไม่แสดง badge
// ============================================================

export type PhotoSlot = {
  /** path รูปภาพ เช่น "/photos/sample1.jpg"
   *  ถ้าเว้นว่างไว้จะแสดง placeholder กล้อง */
  src: string
  /** คำอธิบายรูป */
  alt: string
  /** ข้อความ badge บนรูป เช่น "BEFORE" / "AFTER" — ไม่ใส่ก็ได้ */
  label?: string
}

// ─── เวลาหน่วงระหว่างรูป (มิลลิวินาที) ────────────────────────
export const PHOTOBOOTH_SLIDESHOW_DELAY_MS = 5000

// ─── รายการรูป slideshow แก้ได้ที่นี่ ───────────────────────────
export const PHOTOBOOTH_PREVIEW_PHOTOS: readonly PhotoSlot[] = [
  {
    src: "/images/src/ChatGPT Image 2 พ.ค. 2569 20_23_21.png",
    alt: "ตัวอย่างรูปถ่าย หลังใช้บริการ",
    label: "AFTER",
  },
  {
    src: "/images/src/ChatGPT Image 2 พ.ค. 2569 20_34_03.png",
    alt: "ตัวอย่างรูปถ่าย ก่อนใช้บริการ",
    label: "BEFORE",
  },
]
