
export default function LandingServiceCard({
  title, subtitle, children, className = "border-b"
} : {
  title: string,
  subtitle: string,
  children?: React.ReactNode,
  className?: string
}) {
  return (
  <div className={`${className} flex justify-between py-10`}>
    <div className="h-full w-[30%] flex items-center justify-center">
      {children}
    </div>

    <div className="flex flex-col gap-2 w-[60%] text-slate-700">
      <p className="text-xl font-bold">
        {title}
      </p>
      <p className="text-slate-500">
        {subtitle}
      </p>
    </div>
  </div>
  )
}