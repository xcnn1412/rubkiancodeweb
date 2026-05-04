"use client"

import { useState } from "react"
import { Settings2, X, RotateCcw } from "lucide-react"
import { useTracking, TrackingCategory, TrackingValues } from "@/lib/tracking-context"

const CATEGORIES: { key: TrackingCategory; label: string; labelTh: string }[] = [
  { key: 'heading',    label: 'Heading (H1, H2)',        labelTh: 'หัวข้อใหญ่' },
  { key: 'subheading', label: 'Sub-heading (H3, Badge)', labelTh: 'หัวข้อย่อย' },
  { key: 'body',       label: 'Body Text (P)',            labelTh: 'เนื้อหา' },
  { key: 'button',     label: 'Button / CTA',             labelTh: 'ปุ่ม' },
]

export function TrackingEditor() {
  const [isOpen, setIsOpen] = useState(false)
  const { values, setValues, resetToDefaults } = useTracking()

  const handleChange = (lang: 'th' | 'en', category: TrackingCategory, raw: string) => {
    const value = parseFloat(raw)
    if (isNaN(value)) return
    setValues({
      ...values,
      [lang]: { ...values[lang], [category]: value },
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex flex-col items-end">

      {/* Panel */}
      {isOpen && (
        <div
          className="mb-3 w-80 overflow-hidden"
          style={{
            background: '#1a0e00',
            border: '3px solid #f3f84a',
            boxShadow: '6px 6px 0px #7a5010',
            borderRadius: '16px',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: '#f3f84a', borderBottom: '3px solid #1a0e00' }}
          >
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-[#1a0e00]" />
              <span className="font-black text-sm uppercase tracking-wider text-[#1a0e00]">
                Tracking Editor
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefaults}
                title="Reset to defaults"
                className="p-1 rounded hover:bg-black/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#1a0e00]" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-black/10 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-[#1a0e00]" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-5 max-h-[65vh] overflow-y-auto">

            {CATEGORIES.map((cat) => (
              <div key={cat.key}>
                {/* Category label */}
                <div
                  className="text-xs font-black uppercase tracking-wider mb-3 pb-1"
                  style={{
                    color: '#93c8cf',
                    borderBottom: '1px solid rgba(243,248,74,0.2)',
                  }}
                >
                  {cat.label}
                  <span className="ml-2 opacity-50 normal-case font-normal">
                    {cat.labelTh}
                  </span>
                </div>

                {/* TH Row */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-black w-7 text-center rounded px-1 py-0.5"
                    style={{ background: 'rgba(243,248,74,0.15)', color: '#f3f84a' }}
                  >
                    TH
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={0.3}
                    step={0.005}
                    value={values.th[cat.key]}
                    onChange={(e) => handleChange('th', cat.key, e.target.value)}
                    className="flex-1 h-1.5 cursor-pointer accent-[#f3f84a]"
                  />
                  <input
                    type="number"
                    min={0}
                    max={0.3}
                    step={0.005}
                    value={values.th[cat.key].toFixed(3)}
                    onChange={(e) => handleChange('th', cat.key, e.target.value)}
                    className="w-16 text-right text-xs font-mono font-bold px-1 py-0.5 outline-none"
                    style={{
                      background: 'rgba(243,248,74,0.08)',
                      border: '1px solid rgba(243,248,74,0.3)',
                      borderRadius: '6px',
                      color: '#f3f84a',
                    }}
                  />
                  <span className="text-xs font-mono" style={{ color: 'rgba(243,248,74,0.4)' }}>em</span>
                </div>

                {/* EN Row */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-black w-7 text-center rounded px-1 py-0.5"
                    style={{ background: 'rgba(147,200,207,0.15)', color: '#93c8cf' }}
                  >
                    EN
                  </span>
                  <input
                    type="range"
                    min={-0.05}
                    max={0.2}
                    step={0.005}
                    value={values.en[cat.key]}
                    onChange={(e) => handleChange('en', cat.key, e.target.value)}
                    className="flex-1 h-1.5 cursor-pointer accent-[#93c8cf]"
                  />
                  <input
                    type="number"
                    min={-0.05}
                    max={0.2}
                    step={0.005}
                    value={values.en[cat.key].toFixed(3)}
                    onChange={(e) => handleChange('en', cat.key, e.target.value)}
                    className="w-16 text-right text-xs font-mono font-bold px-1 py-0.5 outline-none"
                    style={{
                      background: 'rgba(147,200,207,0.08)',
                      border: '1px solid rgba(147,200,207,0.3)',
                      borderRadius: '6px',
                      color: '#93c8cf',
                    }}
                  />
                  <span className="text-xs font-mono" style={{ color: 'rgba(147,200,207,0.4)' }}>em</span>
                </div>
              </div>
            ))}

            <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              💾 ค่าบันทึกอัตโนมัติใน localStorage
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Tracking Editor"
        className="w-12 h-12 flex items-center justify-center transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px]"
        style={{
          background: isOpen ? '#f3f84a' : '#1a0e00',
          color: isOpen ? '#1a0e00' : '#f3f84a',
          border: '3px solid #f3f84a',
          boxShadow: '4px 4px 0px #7a5010',
          borderRadius: '12px',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px #7a5010' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px #7a5010' }}
      >
        <Settings2 className="w-5 h-5" />
      </button>
    </div>
  )
}
