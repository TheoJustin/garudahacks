
import { Button } from "@/lib/components/ui/button";
import Image from "next/image";
import CtaButton from "./_components/cta-button";
import mockup from "@/public/images/EasyWork/mockup_easywork.png"
import background from "@/public/images/background.png"
import WorkCardMain from "./_components/work-card-main";
import { BsNvidia } from "react-icons/bs";
import { FaGoogle, FaTwitter } from "react-icons/fa6";
import WorkCardSmall from "./_components/work-card-small";
import { SiGojek } from "react-icons/si";

export default function Home() {

  return (
    <main className="w-screen h-screen flex flex-col bg-slate-100">

      <div className="w-full h-screen flex justify-between">
        <header className="p-20 pt-36 w-[50vw] flex flex-col gap-6">
          {/* Heading */}
          <h1 className="text-7xl font-semibold text-slate-800">Land Your Dream Job with Ease and Confidence</h1>
          <h3 className="mb-4 text-slate-500">With AI-driven insights and personalized recommendations to guide your career journey</h3>

          {/* CTA Button */}
          <CtaButton />
        </header>
        
        <div className="h-full flex w-[40vw] justify-center overflow-hidden relative">
          <div className="absolute w-[50vw] h-[100vh] self-end flex-shrink-0">
            <Image src={background} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>
          <div className="w-[24vw] h-[90vh] relative self-end flex-shrink-0">
            <Image src={mockup} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>
          <div className="absolute w-[40vw] h-[100vh] self-start flex-shrink-0">
              <WorkCardMain color="bg-green-400" className="absolute bottom-72 left-12" subtitle="Nvidia" title="200+ Jobs">
                <BsNvidia className="text-white w-6 h-6"/>
              </WorkCardMain>
              <WorkCardMain color="bg-red-300" className="absolute top-64 right-12" subtitle="Software Engineer" title="230+ Hires">
                <FaGoogle className="text-white w-6 h-6"/>
              </WorkCardMain>
              <WorkCardSmall color="bg-blue-300" className="absolute top-32 left-24">
                <FaTwitter className="text-white w-6 h-6"/>
              </WorkCardSmall>
              <WorkCardSmall color="bg-green-300" className="absolute bottom-48 right-24">
                <SiGojek className="text-white w-6 h-6"/>
              </WorkCardSmall>
          </div>
        </div>

      </div>


    </main>
  );
}
