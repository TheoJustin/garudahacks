"use client"

import { FaSchool, FaSchoolFlag } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import CustomRadio from "./custom-radio";
import { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack  } from "react-icons/io";
import { useFormContext } from "@/lib/context/form_context";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";

export default function WorkFormDetail({
  onNext, onPrevious
} : {
  onNext?: () => void, onPrevious? : () => void
} ) {

  const { formData, appendFormData } = useFormContext()
  const [hasWorkExperience, setHasWorkExperience] = useState(false);
  const [workYears, setWorkYears] = useState(0)
  const [transform, setTransform] = useState("0")
  const [opacity, setOpacity] = useState(0)

  const next = async (direction : 1 | -1) => {
    
    appendFormData({

    })

    setTransform(direction * 50 * -1 + "%");
    setOpacity(0)
    await new Promise(r => setTimeout(r, 600));
    
    if(direction > 0) {
      if(hasWorkExperience) {

      }
      else if(onNext) {
        onNext();
      }
    } else if(onPrevious) {
      onPrevious();
    }
  }

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <div 
      className="w-full pt-10 gap-16 shadow-xl rounded-lg items-center flex flex-col justify-between overflow-hidden transition-all duration-700"
      style={{transform: `translateX(${transform})`, opacity: opacity}}
    >
      <p className="text-lg font-medium text-slate-600">Tell us more about your work experience</p>

      <div className="flex w-full px-20 gap-12 flex-col">
        <Button variant={"outline"} className="border-slate-500 w-full hover:bg-slate-200">
          Add a field experience
        </Button>
      </div>

      <div className="w-full h-16 bg-primary flex justify-between items-center">
        <button 
          className="p-10 text-white flex items-center gap-2 transition-all duration-200 hover:gap-5 opacity-80 hover:opacity-100"
          onClick={() => next(-1)}
        >
          <IoIosArrowRoundBack className="text-white w-6 h-6" />
          PREVIOUS
        </button>
        <button 
          className="p-10 text-white flex items-center gap-2 transition-all duration-200 hover:gap-5 opacity-80 hover:opacity-100"
          onClick={() => next(1)}
        >
          NEXT
          <IoIosArrowRoundForward className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  )
}