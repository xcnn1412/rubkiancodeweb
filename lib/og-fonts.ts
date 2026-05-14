// Shared font loader สำหรับทุก opengraph-image.tsx / twitter-image.tsx
// fetch ไฟล์ฟอนต์ TTF จาก Google Fonts (subset เฉพาะ glyph ที่ใช้จริง — ลด payload)
//
// IMPORTANT: ใช้ UA แบบเก่า (IE9-like) เพื่อบังคับให้ Google ส่ง TTF กลับมา
// (UA modern → ได้ woff2 ซึ่ง Satori parse ไม่ได้)

export async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
    },
  }).then((r) => r.text())
  // IE9 endpoint → src: url(https://fonts.gstatic.com/l/font?kit=...) ไม่มี format() declaration
  // URL นี้ serve TTF ตรงๆ (Google ดูจาก UA)
  const match = css.match(/src:\s*url\(([^)]+)\)/)
  if (!match) {
    throw new Error(
      `Cannot resolve font URL for ${family} ${weight} — got CSS:\n${css.slice(0, 300)}`,
    )
  }
  const buf = await fetch(match[1]).then((r) => r.arrayBuffer())
  return buf
}

// Load หลายตัวพร้อมกันแบบ resilient — ถ้าบางตัว fail จะ log แต่ไม่ throw
// (ImageResponse ต้องการอย่างน้อย 1 font ไม่งั้น "No fonts are loaded")
export async function loadGoogleFontsResilient(
  specs: { family: string; weight: number; text: string; name?: string }[],
  context: string,
) {
  const results = await Promise.allSettled(
    specs.map((s) => loadGoogleFont(s.family, s.weight, s.text)),
  )
  const fonts = results
    .map((r, i) => {
      if (r.status !== "fulfilled") return null
      return {
        name: specs[i].name ?? specs[i].family,
        data: r.value,
        weight: specs[i].weight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
        style: "normal" as const,
      }
    })
    .filter((f): f is NonNullable<typeof f> => f !== null)

  if (fonts.length === 0) {
    const errors = results
      .filter((r) => r.status === "rejected")
      .map((r) => (r as PromiseRejectedResult).reason?.message ?? r)
      .join(" | ")
    throw new Error(`OG image font load failed for ${context}: ${errors}`)
  }
  return fonts
}
