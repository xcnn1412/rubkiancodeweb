// Open Graph image สำหรับ /services (catalog page)
// ดีไซน์: title "บริการทั้งหมด" + grid ของ 6 service titles + counter "12+ บริการ"

import { ImageResponse } from "next/og"
import { loadGoogleFontsResilient } from "@/lib/og-fonts"
import { SERVICES } from "./_data/services"

export const runtime = "nodejs"
export const alt = "บริการของ RubKianCode — Marketing, ERP, Lucky Draw, Photobooth, Custom Software"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  // เอา 6 service ขึ้นมาแสดงเป็น grid (featured ก่อน)
  const display = [
    ...SERVICES.filter((s) => s.featured),
    ...SERVICES.filter((s) => !s.featured),
  ].slice(0, 6)
  const count = SERVICES.length

  const chipText = display.map((s) => s.title).join("")
  const promptText = `บริการทั้งหมดAllServicesรวมทุกซอฟต์แวร์ครบวงจร${chipText}${count}+`
  const pixelText =
    "CATALOGALLSERVICESRUBKIANCODEABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/._-:><,> rubkiancode.com/services"

  const fonts = await loadGoogleFontsResilient(
    [
      { family: "Prompt", weight: 700, text: promptText },
      { family: "Prompt", weight: 900, text: "บริการทั้งหมดAllServices" },
      { family: "Press Start 2P", weight: 400, text: pixelText },
    ],
    "services-index",
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
        {/* Scanline grid */}
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

        {/* Counter ขวาบน */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 220,
            height: 220,
            background: "#F1C40F",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#0A2540",
            fontFamily: "Press Start 2P, monospace",
          }}
        >
          <div style={{ fontSize: 22, display: "flex" }}>ALL</div>
          <div style={{ fontSize: 76, marginTop: 12, display: "flex" }}>{count}+</div>
          <div style={{ fontSize: 16, marginTop: 14, display: "flex" }}>SERVICES</div>
        </div>
        <div style={{ position: "absolute", top: 220, right: 0, width: 220, height: 12, background: "#E63946", display: "flex" }} />
        <div style={{ position: "absolute", top: 0, right: 220, width: 12, height: 220, background: "#E63946", display: "flex" }} />

        {/* Header brand */}
        <div style={{ display: "flex", alignItems: "center", padding: "48px 64px 0", gap: 16 }}>
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
            <div style={{ fontFamily: "Press Start 2P, monospace", fontSize: 22, color: "#F4EDE0", display: "flex" }}>
              <span>rubkian</span>
              <span style={{ color: "#E63946", marginLeft: 2 }}>code</span>
            </div>
            <div style={{ fontFamily: "Press Start 2P, monospace", fontSize: 11, color: "#F4EDE0", opacity: 0.55, marginTop: 8, display: "flex" }}>
              {"> /services"}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", padding: "44px 64px 0", flex: 1, maxWidth: 880 }}>
          <div
            style={{
              background: "#2ECC71",
              color: "#0A2540",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 14,
              padding: "10px 16px",
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 22,
            }}
          >
            {"// SERVICE_CATALOG"}
          </div>

          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#F4EDE0",
              lineHeight: 1.05,
              textShadow: "4px 4px 0 #2ECC71",
              display: "flex",
              marginBottom: 12,
            }}
          >
            บริการทั้งหมด
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#2ECC71",
              lineHeight: 1.2,
              display: "flex",
              marginBottom: 28,
            }}
          >
            All Services
          </div>

          {/* Service chips — 6 ตัว */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              maxWidth: 860,
            }}
          >
            {display.map((s) => {
              const onChip = s.accent === "#F1C40F" ? "#0A2540" : "#FFFFFF"
              return (
                <div
                  key={s.slug}
                  style={{
                    background: s.accent,
                    color: onChip,
                    fontFamily: "Prompt, sans-serif",
                    fontWeight: 700,
                    fontSize: 19,
                    padding: "8px 14px",
                    border: "3px solid #0A2540",
                    boxShadow: "3px 3px 0 #0A2540",
                    display: "flex",
                    marginRight: 6,
                    marginBottom: 6,
                  }}
                >
                  {s.title}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px 56px", gap: 24 }}>
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
            {"> rubkiancode.com/services"}
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
            <span style={{ fontSize: 30, fontWeight: 900, color: "#F1C40F" }}>35,000</span>
            <span style={{ fontSize: 18, color: "#F4EDE0", marginLeft: 6 }}>บาท/ปี</span>
          </div>
        </div>

        {/* Bottom scanline */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 12, background: "#2ECC71", display: "flex" }} />
      </div>
    ),
    { ...size, fonts },
  )
}
