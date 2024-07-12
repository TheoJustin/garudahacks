import Image from "next/image"
import logo from "@/public/images/EasyWork/logo_both_white_1.png"

export default function Footer({
  className = "bg-white"
} : {
  className?: string
}) {
  return (
    <div className={`w-full h-[102vh] flex flex-col justify-between`}>
      <div className={`w-full h-32 ${className} rounded-b-3xl`}>
      </div>
      
      <div className="justify-between flex flex-col h-screen w-screen fixed bottom-0 -z-10 bg-primary">
        <div className="overflow-hidden h-64 flex items-center relative">
          <div className="animate-infinite-scroll whitespace-nowrap flex mt-36">
            <h1 className="text-white text-8xl mx-4">SOLVING WORLD POVERTY, ONE CAREER AT A TIME.</h1>
            <h1 className="text-white text-8xl mx-4">SOLVING WORLD POVERTY, ONE CAREER AT A TIME.</h1>
          </div>
        </div>

        <div className="flex justify-between p-10 w-full">
          <div className="w-48 h-24 relative flex-shrink-0 self-end">
            <Image src={logo} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>

          <div className="flex text-white gap-16 mr-20 pb-4">
            <div className="flex flex-col">
              <p className="font-bold">Browse</p>
              <a className="text-slate-300 hover:text-white cursor-pointer" href="/">Landing Page</a>
              <a className="text-slate-300 hover:text-white cursor-pointer" href="/form">Form</a>
              <a className="text-slate-300 hover:text-white cursor-pointer" href="/job-vacancy">Job Searching</a>
              <a className="text-slate-300 hover:text-white cursor-pointer" href="learn">Learning Program</a>
              <a className="text-slate-300 hover:text-white cursor-pointer" href="/login">Login</a>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">Socials</p>
              <a className="text-slate-300 hover:text-white cursor-pointer">Alden</a>
              <a className="text-slate-300 hover:text-white cursor-pointer">Darryl</a>
              <a className="text-slate-300 hover:text-white cursor-pointer">Jose</a>
              <a className="text-slate-300 hover:text-white cursor-pointer">Theo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}