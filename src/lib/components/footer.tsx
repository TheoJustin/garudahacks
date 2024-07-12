export default function Footer({
  className = "bg-white"
} : {
  className?: string
}) {
  return (
    <div className={`w-full h-[60vh] ${className} p-10`}>
      <div className="w-full h-full border border-slate-300 rounded-xl">

      </div>
    </div>
  )
}