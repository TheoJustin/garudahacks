"use client"

import WorkCardMain from "./work-card-main";
import { BsNvidia } from "react-icons/bs";
import { FaGoogle, FaTwitter } from "react-icons/fa6";
import WorkCardSmall from "./work-card-small";
import { SiGojek } from "react-icons/si";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import mockup from "@/public/images/EasyWork/mockup_easywork.png"
import background from "@/public/images/background.png"

export default function LandingParallax() {

  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 400], [0, -200]);
  const y2 = useTransform(scrollY, [0, 600], [0, -100]);
  const y3 = useTransform(scrollY, [0, 800], [0, -50]);
  const y4 = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <>
    <motion.div className="absolute w-[50vw] h-[100vh] self-end flex-shrink-0" style={{y: y4}}>
      <Image src={background} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
    </motion.div>

    <div className="w-[24vw] h-[90vh] relative self-end flex-shrink-0">
      <Image src={mockup} layout="fill" objectFit="contain" objectPosition="bottom" alt="mockup"/>
    </div>

    <div className="absolute w-[40vw] h-[100vh] self-start flex-shrink-0 md:flex hidden">
        <motion.div style={{y: y1}} className="absolute bottom-72 left-12">
          <WorkCardMain color="bg-green-400" subtitle="Nvidia" title="200+ Jobs">
            <BsNvidia className="text-white w-6 h-6"/>
          </WorkCardMain>
        </motion.div>
        <motion.div style={{y: y3}} className="absolute top-64 right-12" >
          <WorkCardMain color="bg-red-300" subtitle="Software Engineer" title="230+ Hires">
            <FaGoogle className="text-white w-6 h-6"/>
          </WorkCardMain>
        </motion.div>
        <motion.div style={{y: y2}} className="absolute top-32 left-24">
          <WorkCardSmall color="bg-blue-300">
            <FaTwitter className="text-white w-6 h-6"/>
          </WorkCardSmall>
        </motion.div>
        <motion.div style={{y: y2}} className="absolute bottom-48 right-24">
          <WorkCardSmall color="bg-green-300">
            <SiGojek className="text-white w-6 h-6"/>
          </WorkCardSmall>
        </motion.div>
    </div>
    </>
  )
}