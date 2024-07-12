"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/public/images/EasyWork/logo_text_1.png"
import Image from "next/image";
import LandingServiceCard from "./landing-service-card";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiSearchEyeLine } from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";

export default function LandingServices() {

  const { scrollY } = useScroll();

  const width = useTransform(scrollY, [350, 700], ["95%", "100%"]);
  const paddingInline = useTransform(scrollY, [350, 700], ["5rem", "7.5rem"]);
  const borderRadius = useTransform(scrollY, [350, 700], ["5rem", "0rem"]);

  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="h-full w-[95%] bg-white py-16"
        style={{ width, borderRadius, paddingInline }}
      >
        <div className="flex justify-between">
          <div className="w-64 h-24 relative flex-shrink-0">
            <h1 className="text-2xl font-medium text-slate-400 pl-1">Services By</h1>
            <Image src={logo} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
          </div>
          
          <div className="w-[60%] flex flex-col">
            <LandingServiceCard subtitle="Get a personalized career roadmap that guides you through your career journey with AI-driven insights and personalized recommendations." title="Personalized Career Roadmap">
              <FaMapMarkedAlt className="w-20 h-20 text-primary"/>
            </LandingServiceCard>
            <LandingServiceCard subtitle="Discover job opportunities powered by cutting-edge vector database technology and AI, tailored to your skills and career aspirations." title="Intelligent Job Search">
              <RiSearchEyeLine className="w-20 h-20 text-secondary"/>
            </LandingServiceCard> 
            <LandingServiceCard subtitle="Receive a personalized learning plan designed to equip you with the necessary skills and knowledge to excel in your desired career path." title="Customized Learning Plan" className="">
              <GiGraduateCap className="w-20 h-20 text-secondary opacity-70"/>
            </LandingServiceCard> 
          </div>
        </div>
      </motion.div>
    </div>
  )
}