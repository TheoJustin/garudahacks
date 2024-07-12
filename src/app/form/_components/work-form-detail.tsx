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
import { Credenza, CredenzaContent, CredenzaTrigger } from "@/lib/components/credenza";
import { WorkExperience } from "@/lib/types/user-form.types";

export default function WorkFormDetail({
  onNext, onPrevious
} : {
  onNext?: () => void, onPrevious? : () => void
} ) {

  const { formData, appendFormData } = useFormContext()

  const [transform, setTransform] = useState("0")
  const [opacity, setOpacity] = useState(0)
  const [experiences, setExperiences] = useState(formData.workExperiences || [] as WorkExperience[])
  const [workExperience, setWorkExperience] = useState({} as WorkExperience)

  const addWorkExperience = () => {
    setExperiences([...experiences, workExperience])
    setWorkExperience({} as WorkExperience)
  }

  const next = async (direction : 1 | -1) => {
    
    appendFormData({
      workExperiences: experiences
    })

    setTransform(direction * 50 * -1 + "%");
    setOpacity(0)
    await new Promise(r => setTimeout(r, 600));
    
    if(direction > 0) {
      if(onNext) {
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
    <Credenza>
      <div 
        className="w-full pt-10 gap-16 shadow-xl rounded-lg items-center flex flex-col justify-between overflow-hidden transition-all duration-700"
        style={{transform: `translateX(${transform})`, opacity: opacity}}
      >
        <p className="text-lg font-medium text-slate-600">Tell us more about your work experience</p>

        <div className="flex w-full px-20 gap-12 flex-col">
          <CredenzaTrigger>
            <Button variant={"outline"} className="border-slate-500 w-full hover:bg-slate-200">
              Add a field experience
            </Button>
          </CredenzaTrigger>
        </div>
        
        {
          experiences?.length > 0 && (
            <div className="flex flex-col gap-4 items-center">
              {
                experiences.map((experience, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <h3 className="font-medium text-slate-600">{experience.field} - {experience.year} years</h3>
                    <p className="text-sm text-slate-400">{experience.latestPosition}</p>
                  </div>
                ))
              }
            </div>
          )
        }

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

      <CredenzaContent>
        Add a work experience
        <Input 
          placeholder="Field name" 
          onChange={(e) => setWorkExperience({...workExperience, field: e.target.value})}
          value={workExperience.field}
        />
        <Input 
          placeholder="Years of experience"
          onChange={(e) => setWorkExperience({...workExperience, year: parseInt(e.target.value)})}
          value={workExperience.year === 0 ? "" : workExperience.year}
        />
        <Input 
          placeholder="Latest position" 
          onChange={(e) => setWorkExperience({...workExperience, latestPosition: e.target.value})}
          value={workExperience.latestPosition}
        />
        <Button onClick={addWorkExperience}>Add</Button>
      </CredenzaContent>

    </Credenza>
  )
}