// Twitter card image — ใช้ดีไซน์เดียวกับ Open Graph image
// route segment config ต้องประกาศ statically ต่อไฟล์ (re-export ไม่ได้)
// ส่วน default handler + generateStaticParams ใช้ตัวเดียวกับ opengraph-image
import OgImage, { generateStaticParams as genParams } from "./opengraph-image"

export const runtime = "nodejs"
export const alt = "RubKianCode — รับเขียนโปรแกรมครบวงจรสำหรับ SME ไทย"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export const generateStaticParams = genParams
export default OgImage
