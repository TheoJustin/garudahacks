export default function Footer({
  className = "bg-white"
} : {
  className?: string
}) {
  return (
    <div className={`${className} w-full h-[60vh]`}>
      <div className={`w-full h-full bg-white rounded-t-3xl`}>
      </div>
    </div>
  )
}