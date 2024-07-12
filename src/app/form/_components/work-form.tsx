"use client"

import { FaSchool, FaSchoolFlag } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import CustomRadio from "./custom-radio";
import { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack  } from "react-icons/io";
import { useFormContext } from "@/lib/context/form_context";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { Input } from "@/lib/components/ui/input";
import WorkFormDetail from "./work-form-detail";

export default function WorkForm({
  onNext, onPrevious
} : {
  onNext?: () => void, onPrevious? : () => void
} ) {

  const { formData, appendFormData } = useFormContext()
  const [hasWorkExperience, setHasWorkExperience] = useState(formData.workExperience || false);
  const [transform, setTransform] = useState("0")
  const [opacity, setOpacity] = useState(0)
  
  const [subpageIndex, setSubpageIndex] = useState(0)

  const restore = () => {
    setOpacity(1);
    setTransform("0")
    setSubpageIndex(0);
  }

  const next = async (direction : 1 | -1) => {
    
    appendFormData({
      workExperience: true
    })

    setTransform(direction * 50 * -1 + "%");
    setOpacity(0)
    await new Promise(r => setTimeout(r, 600));
    
    if(direction > 0) {
      if(hasWorkExperience) {
        setSubpageIndex(1)
      }
      else if(onNext) {
        onNext();
      }
    } else if(onPrevious) {
      onPrevious();
    }
  }

  useEffect(() => {
    restore()
  }, [])

  return (
    <>

    {
      subpageIndex === 0 ? (
          <div 
          className="w-full pt-10 gap-16 shadow-xl rounded-lg items-center flex flex-col justify-between overflow-hidden transition-all duration-700"
          style={{transform: `translateX(${transform})`, opacity: opacity}}
        >
          <p className="text-lg font-medium text-slate-600">Do you have any work experience?</p>
    
          <div className="flex justify-between w-full px-16 gap-12">
            <CustomRadio 
              label={"No Work Experience"}
              isActive={hasWorkExperience === false}
              onClick={() => setHasWorkExperience(false)}
            >
              <FaSchool className="h-12 w-12 text-primary"/>
            </CustomRadio>
            <CustomRadio 
              label={"Work Experience"}
              isActive={hasWorkExperience === true}
              onClick={() => setHasWorkExperience(true)}
            >
              <BsSuitcaseLgFill className="h-12 w-12 text-primary"/>
            </CustomRadio>
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
      ) : (
        <WorkFormDetail onPrevious={restore} onNext={onNext}/>
      )
    }
    </>
  )
}