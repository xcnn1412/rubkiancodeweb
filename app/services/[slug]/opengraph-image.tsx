// Dynamic Open Graph image generator สำหรับ /services/{slug}
// Next.js auto-detect ไฟล์นี้แล้วใส่ <meta property="og:image"> ให้ทุกหน้า service
// build time: SSG ทุก slug → ได้ PNG 1200x630 ที่ unique ต่อ service
//
// ดีไซน์ pixel-art arcade ให้แมตช์กับ brand:
//   - navy bg + scanline + accent block ของ service
//   - Title (Thai) ใหญ่กลางซ้าย / Subtitle (EN) เล็กกว่า
//   - eyebrow "// PRODUCT_{num}" + brand mark บนซ้าย
//   - URL บาร์ล่างขวา
//
// Font: fetch Prompt + Press Start 2P จาก Google Fonts (subset ตาม text)

import { ImageResponse } from "next/og"
import { loadGoogleFontsResilient } from "@/lib/og-fonts"
import { SERVICES, getService } from "../_data/services"

export const runtime = "nodejs"
export const alt = "RubKianCode — รับเขียนโปรแกรมครบวงจรสำหรับ SME ไทย"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// SSG: pre-render OG image ทุก slug ตอน build
export function generateStaticParams() {
  return SERVICES.filter((s) => !s.customPage).map((s) => ({ slug: s.slug }))
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)

  // กรณีไม่พบ — generic brand card
  if (!service) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0A2540",
            color: "#F4EDE0",
            fontSize: 64,
          }}
        >
          RubKianCode
        </div>
      ),
      size,
    )
  }

  const accent = service.accent
  // ตัวอักษรบน accent — ถ้า accent เป็นเหลือง (สว่าง) ใช้ navy ไม่งั้นใช้ขาว
  const onAccent = accent === "#F1C40F" ? "#0A2540" : "#FFFFFF"

  const num = service.num
  const title = service.title
  const subtitle = service.subtitle
  const description = service.description.length > 120
    ? service.description.slice(0, 117).trimEnd() + "…"
    : service.description
  const urlPath = `rubkiancode.com/services/${service.slug}`

  // โหลด font เฉพาะ glyph ที่จะใช้จริง — ลด font size + เร็วขึ้น
  const promptText =
    `${title}${subtitle}${description}${service.startingPrice ?? ""}เริ่มต้นบาทปีบริการพัฒนาซอฟต์แวร์ครบวงจร/,.0123456789`
  const pixelText = `${num}${urlPath}PRODUCTSERVICEOFFICIALRUBKIANCODESOFTWARESTUDIOEXEABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/._-:`

  const fonts = await loadGoogleFontsResilient(
    [
      { family: "Prompt", weight: 700, text: promptText },
      { family: "Prompt", weight: 900, text: title + subtitle },
      { family: "Press Start 2P", weight: 400, text: pixelText },
    ],
    `services/${slug}`,
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0A2540",
          color: "#F4EDE0",
          fontFamily: "Prompt, sans-serif",
          position: "relative",
        }}
      >
        {/* Scanline grid — pixel-art texture บางๆ ที่ background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(244,237,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,237,224,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />

        {/* Accent corner block — มุมขวาบน (pixel-art shadow) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 220,
            height: 220,
            background: accent,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 220,
            right: 0,
            width: 220,
            height: 12,
            background: "#E63946",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 220,
            width: 12,
            height: 220,
            background: "#E63946",
            display: "flex",
          }}
        />

        {/* Num badge ลอยอยู่บน accent block */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            color: onAccent,
            fontFamily: "Press Start 2P, monospace",
            lineHeight: 1,
          }}
        >
          <div style={{ fontSize: 22, opacity: 0.85, display: "flex" }}>PRODUCT</div>
          <div style={{ fontSize: 96, marginTop: 18, display: "flex" }}>{num}</div>
        </div>

        {/* Header: brand mark บนซ้าย */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "48px 64px 0",
            gap: 16,
          }}
        >
          {/* Logo block */}
          <div
            style={{
              width: 56,
              height: 56,
              background: "#F1C40F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A2540",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 28,
              boxShadow: "5px 5px 0 #E63946",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
            <div
              style={{
                fontFamily: "Press Start 2P, monospace",
                fontSize: 22,
                color: "#F4EDE0",
                display: "flex",
              }}
            >
              <span>rubkian</span>
              <span style={{ color: "#E63946", marginLeft: 2 }}>code</span>
            </div>
            <div
              style={{
                fontFamily: "Press Start 2P, monospace",
                fontSize: 11,
                color: "#F4EDE0",
                opacity: 0.55,
                marginTop: 8,
                display: "flex",
              }}
            >
              {"> software_studio.exe"}
            </div>
          </div>
        </div>

        {/* Body: title + subtitle + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "44px 64px 0",
            flex: 1,
            maxWidth: 880,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                background: accent,
                color: onAccent,
                fontFamily: "Press Start 2P, monospace",
                fontSize: 14,
                padding: "10px 16px",
                display: "flex",
                marginRight: 12,
              }}
            >
              {"// SERVICE_" + num}
            </div>
            <div
              style={{
                color: "#F4EDE0",
                opacity: 0.6,
                fontFamily: "Press Start 2P, monospace",
                fontSize: 13,
                display: "flex",
              }}
            >
              {service.slug.toUpperCase()}
            </div>
          </div>

          {/* Title (Thai) */}
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#F4EDE0",
              lineHeight: 1.1,
              textShadow: `4px 4px 0 ${accent}`,
              display: "flex",
              marginBottom: 8,
            }}
          >
            {title}
          </div>

          {/* Subtitle (English/secondary) */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: accent,
              lineHeight: 1.2,
              display: "flex",
              marginBottom: 28,
            }}
          >
            {subtitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#F4EDE0",
              opacity: 0.85,
              lineHeight: 1.4,
              display: "flex",
              maxWidth: 820,
            }}
          >
            {description}
          </div>
        </div>

        {/* Footer bar — URL + ราคา (compact 1-line layout) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 64px 56px",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0A2540",
              border: "3px solid #F1C40F",
              color: "#F1C40F",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 15,
              padding: "14px 20px",
              boxShadow: "5px 5px 0 #E63946",
              whiteSpace: "nowrap",
            }}
          >
            {">"} {urlPath}
          </div>

          {service.startingPrice ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                color: "#F4EDE0",
                fontFamily: "Prompt, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 16, color: "#2ECC71", marginRight: 10 }}>เริ่มต้น</span>
              <span style={{ fontSize: 30, fontWeight: 900, color: "#F1C40F" }}>
                {service.startingPrice}
              </span>
            </div>
          ) : null}
        </div>

        {/* Bottom scanline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: accent,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  )
}
