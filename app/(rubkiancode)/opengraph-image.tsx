// Open Graph image สำหรับหน้าแรก /
// ดีไซน์: brand wordmark ใหญ่ + tagline + 4 service chips (สีต่างกันตาม accent)
// + ราคาเริ่มต้น 35,000 บาท/ปี + URL bar
//
// Pre-rendered ตอน build เป็น PNG 1200x630

import { ImageResponse } from "next/og"
import { loadGoogleFontsResilient } from "@/lib/og-fonts"
import { SERVICES } from "../services/_data/services"

export const runtime = "nodejs"
export const alt = "RubKianCode — รับเขียนซอฟต์แวร์ครบวงจรสำหรับ SME ไทย เริ่มต้น 35,000 บาท/ปี"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  // เลือกเฉพาะ featured services (4 ตัวหลัก) แสดงเป็น chips
  const featured = SERVICES.filter((s) => s.featured).slice(0, 4)

  const chipText = featured.map((s) => s.title).join("")
  const promptText = `RubKianCodeรับเขียนซอฟต์แวร์ครบวงจรสำหรับSMEไทยเริ่มต้นบาทปี${chipText}จดทะเบียนพาณิชย์ถูกต้อง`
  const pixelText =
    "RUBKIANCODESOFTWARESTUDIOEXEHOMEPAGEABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/._-:><,> rubkiancode.com"

  const fonts = await loadGoogleFontsResilient(
    [
      { family: "Prompt", weight: 700, text: promptText },
      { family: "Prompt", weight: 900, text: "RubKianCodeรับเขียนซอฟต์แวร์ครบวงจร" },
      { family: "Press Start 2P", weight: 400, text: pixelText },
    ],
    "home",
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
        {/* Scanline grid texture */}
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

        {/* Mosaic corner ขวาบน — pixel decoration 4 บล็อก สี accent ของ 4 บริการ */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ width: 110, height: 110, background: featured[0]?.accent ?? "#E63946" }} />
            <div style={{ width: 110, height: 110, background: featured[1]?.accent ?? "#3498DB" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 110, height: 110, background: featured[2]?.accent ?? "#F1C40F" }} />
            <div style={{ width: 110, height: 110, background: featured[3]?.accent ?? "#2ECC71" }} />
          </div>
        </div>
        {/* Red shadow ใต้ mosaic */}
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

        {/* Header: brand mark ใหญ่ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "56px 64px 0",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              background: "#F1C40F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A2540",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 36,
              boxShadow: "6px 6px 0 #E63946",
            }}
          >
            R
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 22,
            }}
          >
            <div
              style={{
                fontFamily: "Press Start 2P, monospace",
                fontSize: 32,
                color: "#F4EDE0",
                display: "flex",
                lineHeight: 1,
              }}
            >
              <span>rubkian</span>
              <span style={{ color: "#E63946", marginLeft: 4 }}>code</span>
            </div>
            <div
              style={{
                fontFamily: "Press Start 2P, monospace",
                fontSize: 13,
                color: "#F4EDE0",
                opacity: 0.6,
                marginTop: 10,
                display: "flex",
              }}
            >
              {"> software_studio.exe"}
            </div>
          </div>
        </div>

        {/* Body: tagline ใหญ่ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 64px 0",
            flex: 1,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              background: "#E63946",
              color: "#FFFFFF",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 14,
              padding: "10px 16px",
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 24,
            }}
          >
            {"// HOMEPAGE"}
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#F4EDE0",
              lineHeight: 1.1,
              textShadow: "4px 4px 0 #E63946",
              display: "flex",
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            รับเขียนซอฟต์แวร์
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#F1C40F",
              lineHeight: 1.2,
              display: "flex",
              marginBottom: 32,
            }}
          >
            ครบวงจรสำหรับ SME ไทย
          </div>

          {/* Service chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              maxWidth: 880,
            }}
          >
            {featured.map((s) => {
              const onChip = s.accent === "#F1C40F" ? "#0A2540" : "#FFFFFF"
              return (
                <div
                  key={s.slug}
                  style={{
                    background: s.accent,
                    color: onChip,
                    fontFamily: "Prompt, sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    padding: "10px 18px",
                    border: "3px solid #0A2540",
                    boxShadow: "4px 4px 0 #0A2540",
                    display: "flex",
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer: URL + price */}
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
              fontSize: 16,
              padding: "14px 22px",
              boxShadow: "5px 5px 0 #E63946",
              whiteSpace: "nowrap",
            }}
          >
            {"> rubkiancode.com"}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              fontFamily: "Prompt, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 16, color: "#2ECC71", marginRight: 10 }}>เริ่มต้น</span>
            <span style={{ fontSize: 34, fontWeight: 900, color: "#F1C40F" }}>35,000</span>
            <span style={{ fontSize: 20, color: "#F4EDE0", marginLeft: 6 }}>บาท/ปี</span>
          </div>
        </div>

        {/* Bottom scanline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "#E63946",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  )
}
