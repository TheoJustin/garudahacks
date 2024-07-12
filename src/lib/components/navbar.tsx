"use client"

import logo from "@/public/images/EasyWork/logo.png"
import logo_text from "@/public/images/EasyWork/logo_text_1.png"
import { UserIcon } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import useHasScrolled from "../hooks/useHasScrolled";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export default function Navbar({
  hoveredClassName = "bg-white shadow-lg"
} : {
  hoveredClassName?: string
}) {

  const hasScrolled = useHasScrolled();

  return (
    <>
    <nav className="w-full h-28 p-4 px-4 flex fixed justify-between items-center z-30">
      <div className={`flex items-center p-4 pr-8 rounded-xl bg-transparent ${hasScrolled ? `${hoveredClassName}` : ""}`}>
        <div className="w-16 h-12 relative flex-shrink-0">
          <Image src={logo} layout="fill" objectFit="contain" alt="mockup"/>
        </div>
        <div className={`${hasScrolled ? "w-0" : "w-28"} relative flex-shrink-0 overflow-hidden transition-all duration-500`}>
          <div className="w-28 h-16 relative">
            <Image src={logo_text} layout="fill" objectFit="contain" alt="mockup"/>
          </div>
        </div>

        <div className="flex ml-10 gap-4">
          <a href="/job-vacancy" className="text-slate-600 hover:text-black">Jobs</a>
          <a href="/learn" className="text-slate-600 hover:text-black">Learn</a>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className={`${hasScrolled ? "translate-x-full opacity-0" : "opacity-100"} transition-all duration-500`}>
          <SignedOut>
            <Button className="bg-primary rounded-xl px-8">Register</Button>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              Sign Out
            </SignOutButton>
          </SignedIn>
          {/* <Link href={'/profile'} className={`w-9 h-9 bg-white hover:bg-slate-200 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer`}>
              <UserIcon />
          </Link> */}
        </div>
      </div>
    </nav>
    <div className="w-full h-28"></div>
    </>
  )
}