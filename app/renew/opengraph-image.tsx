// Open Graph image สำหรับ /renew (page ต่ออายุ)
// ดีไซน์: warning/urgency theme — red+yellow stripes + CTA channels (LINE/โทร/อีเมล)

import { ImageResponse } from "next/og"
import { loadGoogleFontsResilient } from "@/lib/og-fonts"

export const runtime = "nodejs"
export const alt = "ต่ออายุบริการ — RubKianCode | ติดต่อเราเพื่อต่ออายุระบบ"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const promptText =
    "ต่ออายุบริการระบบของคุณRubKianCodeติดต่อเราโทรLINEEmailรับเขียนซอฟต์แวร์@rubkiancode"
  const pixelText =
    "RENEWWARNINGEXPIREDCONTACTRUBKIANCODELINEEMAILPHONEABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/._-:><,> rubkiancode.com/renew"

  const fonts = await loadGoogleFontsResilient(
    [
      { family: "Prompt", weight: 700, text: promptText },
      { family: "Prompt", weight: 900, text: "ต่ออายุบริการระบบของคุณ" },
      { family: "Press Start 2P", weight: 400, text: pixelText },
    ],
    "renew",
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

        {/* Diagonal warning stripes บนสุด — red/yellow alternating */}
        <div style={{ display: "flex", width: "100%", height: 36 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 36,
                background: i % 2 === 0 ? "#E63946" : "#F1C40F",
                display: "flex",
              }}
            />
          ))}
        </div>

        {/* Warning badge มุมขวาบน */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            background: "#E63946",
            color: "#FFFFFF",
            fontFamily: "Press Start 2P, monospace",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px 22px",
            border: "4px solid #F1C40F",
            boxShadow: "6px 6px 0 #0A2540",
          }}
        >
          <div style={{ fontSize: 18, display: "flex" }}>!! RENEW !!</div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9, display: "flex" }}>EXPIRED</div>
        </div>

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
              {"> /renew"}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px 0", flex: 1, maxWidth: 880 }}>
          <div
            style={{
              background: "#F1C40F",
              color: "#0A2540",
              fontFamily: "Press Start 2P, monospace",
              fontSize: 14,
              padding: "10px 16px",
              display: "flex",
              alignSelf: "flex-start",
              marginBottom: 22,
            }}
          >
            {"// WARNING · SYSTEM_EXPIRED"}
          </div>

          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#F4EDE0",
              lineHeight: 1.0,
              textShadow: "5px 5px 0 #E63946",
              display: "flex",
              marginBottom: 14,
            }}
          >
            ต่ออายุบริการ
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#F1C40F",
              lineHeight: 1.3,
              display: "flex",
              marginBottom: 30,
              maxWidth: 820,
            }}
          >
            ระบบของคุณหมดอายุ — ติดต่อเราเพื่อต่ออายุ
          </div>

          {/* CTA channels chips */}
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                background: "#E63946",
                color: "#FFFFFF",
                fontFamily: "Prompt, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                padding: "12px 20px",
                border: "3px solid #0A2540",
                boxShadow: "4px 4px 0 #0A2540",
                display: "flex",
                marginRight: 8,
              }}
            >
              โทร 063-594-4429
            </div>
            <div
              style={{
                background: "#2ECC71",
                color: "#FFFFFF",
                fontFamily: "Prompt, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                padding: "12px 20px",
                border: "3px solid #0A2540",
                boxShadow: "4px 4px 0 #0A2540",
                display: "flex",
              }}
            >
              LINE @rubkiancode
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 64px 56px" }}>
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
            {"> rubkiancode.com/renew"}
          </div>
        </div>

        {/* Bottom warning stripes */}
        <div style={{ display: "flex", width: "100%", height: 24, position: "absolute", bottom: 0, left: 0 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 24,
                background: i % 2 === 0 ? "#E63946" : "#F1C40F",
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
