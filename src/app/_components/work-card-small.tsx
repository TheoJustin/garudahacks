
export default function WorkCardSmall({
  color, children, className
} : {
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
    </div>
  )
}