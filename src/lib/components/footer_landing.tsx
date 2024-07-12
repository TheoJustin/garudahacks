import Image from "next/image"
import logo from "@/public/images/EasyWork/logo_both_white_1.png"
import CtaField from "@/app/_components/cta-field"

export default function FooterLanding({
  className = "bg-white"
} : {
  className?: string
}) {
  return (
    <div className={`w-full h-[105vh] flex flex-col justify-between`}>
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
            
          <div className="w-96 mr-20 flex flex-col items-end">
            <p className="text-white text-xl font-medium mb-2">Get me a job!</p>
            <CtaField className="w-full"/>
          </div>
        </div>
      </div>
    </div>
  )
}