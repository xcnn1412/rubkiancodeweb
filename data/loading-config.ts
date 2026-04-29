// ╔══════════════════════════════════════════════════════════════════╗
// ║  loading-config.ts                                               ║
// ║  แก้ไข Loading Screen ได้ที่นี่ที่เดียว ไม่ต้องแตะ Component   ║
// ╚══════════════════════════════════════════════════════════════════╝

export const LOADING_CONFIG = {

  // ─────────────────────────────────────────────
  // ⏱  TIMING
  // ─────────────────────────────────────────────

  /** ระยะเวลาขั้นต่ำที่จะแสดง Loading (ms) แม้ว่าเว็บจะโหลดเสร็จแล้ว */
  minDurationMs: 2600,

  /** ดีเลย์ก่อน fade-out (ms) หลังจาก minDuration ครบ */
  exitDelayMs: 200,

  /** ระยะเวลา fade-out animation (ms) */
  fadeOutDurationMs: 500,


  // ─────────────────────────────────────────────
  // 🎨  COLORS  — เข้ากับธีม warm retro ของเว็บ
  // ─────────────────────────────────────────────

  /** สีพื้นหลัง — ใช้สี cream เดียวกับ Hero Section */
  bgColor: '#f2efdb',

  /** สีขอบและตัวอักษรหลัก */
  accentColor: '#1a0e00',

  /** สีอ่อนลงสำหรับ border รอง */
  accentDim: 'rgba(26,14,0,0.18)',

  /** สีตัวอักษรหลัก */
  textColor: '#1a0e00',

  /** สีตัวอักษรรอง */
  textDim: 'rgba(26,14,0,0.45)',

  /** สีพื้น badge / highlight box */
  badgeBg: '#f4e6af',

  /** สีเส้นขอบ badge */
  badgeBorder: '#1a0e00',

  /** สี box-shadow offset (brutalist style) */
  shadowColor: '#7a5010',

  /** สี teal สำหรับ corner brackets (เหมือน hero section) */
  bracketColor: '#93c8cf',

  /** สี progress bar */
  progressColor: '#1a0e00',

  /** สี progress track */
  progressTrack: 'rgba(26,14,0,0.12)',


  // ─────────────────────────────────────────────
  // 📝  TEXT
  // ─────────────────────────────────────────────

  /** ชื่อแบรนด์ที่แสดงกลางจอ */
  brandName: 'RubKianCode',

  /** bracket ซ้าย-ขวาของโลโก้ */
  bracketLeft: '【',
  bracketRight: '】',

  /** subtitle ใต้ชื่อแบรนด์ */
  subtitle: 'SOFTWARE STUDIO',

  /** ข้อความ status bar ด้านล่าง เปลี่ยนได้ตามฤดูกาล/แคมเปญ */
  statusMessages: [
    'INITIALIZING...',
    'LOADING COMPONENTS...',
    'PREPARING...',
    'ALMOST READY...',
  ],

  /** ข้อความ copyright ด้านล่างสุด */
  copyright: '© 2026 RubKian Code Co., Ltd.',


  // ─────────────────────────────────────────────
  // ✨  EFFECTS
  // ─────────────────────────────────────────────

  /** แสดง floating code symbols พื้นหลัง (เหมือน Hero) */
  showCodeBg: true,

  /** แสดง progress bar */
  showProgressBar: true,

  /** แสดง corner brackets (เหมือน Hero section) */
  showCorners: true,

  /** แสดง blinking cursor หลัง brand name */
  showCursor: true,

} as const

export type LoadingConfig = typeof LOADING_CONFIG
