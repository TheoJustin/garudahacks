export default function CustomRadio({
  isActive, label, children, onClick
} : {
  isActive?: boolean,
  label?: string, 
  children?: React.ReactNode, 
  onClick?: () => void
}) {
    return (
      <button 
        className={`border h-36 w-full border-slate-600 rounded-sm p-4 flex flex-col items-center justify-between cursor-pointer transition duration-200 ${isActive && "bg-blue-100"}`}
        onClick={onClick}
      >
        <div className="w-5 h-5 border border-slate-600 self-start rounded-full flex items-center justify-center p-1">
          <div className={`w-full h-full bg-secondary rounded-full transition duration-100 ${isActive ? "opacity-100" : "opacity-0"}`}></div>
        </div>

        {children}

        <p className="text-sm text-slate-700">{label}</p>
      </button>
    )
}