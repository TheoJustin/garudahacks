

import { Button } from "@/lib/components/ui/button";
import Image from "next/image";
import CtaField from "./_components/cta-field";
import mockup from "@/public/images/EasyWork/mockup_easywork.png"
import background from "@/public/images/background.png"
import LandingServices from "./_components/landing-services";
import LandingParallax from "./_components/landing-parallax";
import Footer from "@/lib/components/footer";

export default function Home() {

  return (
    <main className="w-full flex flex-col bg-slate-100">

      <div className="w-full h-screen flex justify-between">
        <header className="p-20 pt-36 w-[50vw] flex flex-col gap-6">
          {/* Heading */}
          <h1 className="text-7xl font-semibold text-slate-800">Land Your Dream Job with Ease and Confidence</h1>
          <h3 className="mb-4 text-slate-500">With AI-driven insights and personalized recommendations to guide your career journey</h3>

          {/* CTA Button */}
          <CtaField />
        </header>
        
        <div className="h-full flex w-[40vw] justify-center overflow-hidden relative">
          <div className="absolute w-[50vw] h-[100vh] self-end flex-shrink-0">
            <Image src={background} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>
          <div className="w-[24vw] h-[90vh] relative self-end flex-shrink-0">
            <Image src={mockup} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>
          
          <LandingParallax />
        </div>
      </div>

      <LandingServices />

      <Footer />
    </main>
  );
}
