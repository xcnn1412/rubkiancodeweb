export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#f2efdb" }}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-14 h-14 rounded-full animate-spin"
          style={{
            border: "5px solid #cddce9",
            borderTopColor: "#1a0e00",
          }}
        />
        <span
          className="font-mono font-black uppercase text-xs tracking-widest"
          style={{ color: "#555856" }}
        >
          loading...
        </span>
      </div>
    </div>
  )
}
