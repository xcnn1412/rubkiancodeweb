// ─────────────────────────────────────────────────────────────────────────────
//  showcase-media.ts
//
//  THIS IS THE ONLY FILE YOU NEED TO EDIT when adding / removing media.
//
//  HOW TO ADD MEDIA (3 steps):
//  1. Drop your file in:
//       public/videos/<projectKey>/yourfile.mp4   ← for videos
//       public/images/<projectKey>/yourfile.webp  ← for images
//  2. Add an entry in the correct array below.
//  3. Save & refresh the browser — done!
//
//  MediaItem types:
//    { type: "video"; src: string }
//      → plays until the video ends, then advances
//    { type: "image"; src: string; duration?: number }
//      → shown for `duration` ms (default 4 000 ms), then advances
//
//  CARD DISPLAY (per project):
//    "video"  → แสดงวิดีโอแรกใน card thumbnail (muted, autoplay, loop)
//    "image"  → แสดงรูปแรกใน card thumbnail
//    "color"  → แสดงสีพื้นหลัง (previewColor) แบบเดิม
//    number   → แสดง media ตาม index (เช่น 0 = คลิปแรก, 1 = คลิปสอง)
//    { type: "video" | "image", src: string } → ไฟล์แยกเฉพาะปก ไม่รวมใน Gallery ของ Modal
// ─────────────────────────────────────────────────────────────────────────────

export type MediaItem =
  | { type: "video"; src: string }
  | { type: "image"; src: string; duration?: number }

export type CardDisplayMode = "video" | "image" | "color" | number | { type: "video" | "image"; src: string }

/**
 * Map each project key → ordered array of media to show in the MODAL player.
 * Empty array = no player; the original TV-preview placeholder is shown instead.
 */
export const SHOWCASE_MEDIA: Record<string, MediaItem[]> = {

  project0: [
    { type: "video", src: "/videos/project0/reelsign1.mp4" },
    { type: "video", src: "/videos/project0/reelsign2.mp4" },
    { type: "video", src: "/videos/project0/liveview1.mp4" },
    { type: "video", src: "/videos/project0/liveview2.mp4" },
    { type: "video", src: "/videos/project0/Vsign1.mp4" },
    { type: "video", src: "/videos/project0/Vsign2.mp4" },
    { type: "video", src: "/videos/project0/reels1.mp4" },
  ],

  project1: [
    { type: "video", src: "/videos/project1/moshipayment.mp4" },
    { type: "video", src: "/videos/project1/newspaper1.mp4" },
    { type: "video", src: "/videos/project1/moshi1.mp4" },
  ],

  project2: [
    { type: "image", src: "/images/project2/office1.png", duration: 5000 },
    { type: "image", src: "/images/project2/office2.png", duration: 5000 },
    { type: "image", src: "/images/project2/office3.png", duration: 5000 },
    { type: "image", src: "/images/project2/office4.png", duration: 5000 },
  ],

  project3: [
    { type: "video", src: "/videos/project3/luckydrawpreview.mp4" },
    { type: "video", src: "/videos/project3/Luckydraw1.mp4" },
    { type: "image", src: "/images/project3/register_pic1.jpg", duration: 5000 },
    { type: "image", src: "/images/project3/register_pic2.jpg", duration: 5000 },
    { type: "image", src: "/images/project3/register_pic3.jpg", duration: 5000 },
  ],
}

/**
 * ── Card Display Config ────────────────────────────────────────────────────
 * ปรับสิ่งที่แสดงใน thumbnail ของแต่ละการ์ดใน showcase section ได้ที่นี่
 * "video"  → ใช้วิดีโอแรกจาก SHOWCASE_MEDIA (muted loop)
 * "image"  → ใช้รูปแรกจาก SHOWCASE_MEDIA
 * "color"  → แสดงสีพื้นหลัง (previewColor) แบบเดิม
 * ตัวเลข (เช่น 0, 1, 2) → ระบุ index ของคลิป/รูปใน SHOWCASE_MEDIA
 * { type: "video", src: "/path..." } → ใส่ไฟล์ตรงๆ โดยไม่ให้เข้าไปรวมกับคลิปใน Modal
 */
export const SHOWCASE_CARD_DISPLAY: Record<string, CardDisplayMode> = {
  project0: { type: "video", src: "/videos/project0/preview1.mp4" },
  project1: "video",
  project2: 0,
  project3: 0,
}
