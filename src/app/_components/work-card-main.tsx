
export default function WorkCardMain({
  title, subtitle, color, children, className
} : {
  title: string,
  subtitle: string,
  color: string,
  className?: string,
  children: React.ReactNode
}) {
  return (
    <div className={`h-fit w-fit p-1.5 bg-white shadow-lg rounded-sm flex gap-2 ${className}`}>
      <div className={`h-12 w-12 ${color} rounded-sm flex items-center justify-center`}>
        {
          children
        }
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs text-slate-500">{subtitle}</p>
        <p className="text-sm font-bold text-slate-700">{title}</p>
      </div>
    </div>
  )
}