import { FaSchool, FaSchoolFlag } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import CustomRadio from "./custom-radio";
import { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack  } from "react-icons/io";
import { useFormContext } from "@/lib/context/form_context";
import { FaMale, FaFemale } from "react-icons/fa";

export default function GenderForm({
  onNext, onPrevious
} : {
  onNext?: () => void, onPrevious? : () => void
} ) {

  const { formData, appendFormData } = useFormContext()
  const [selectedGender, setselectedGender] = useState(formData?.gender || "Male")
  const [transform, setTransform] = useState("0")
  const [opacity, setOpacity] = useState(0)

  const next = async (direction : 1 | -1) => {
    
    appendFormData({
      gender: selectedGender
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
    <div 
      className="w-full pt-10 gap-16 shadow-xl rounded-lg items-center flex flex-col justify-between overflow-hidden transition-all duration-700"
      style={{transform: `translateX(${transform})`, opacity: opacity}}
    >
      <p className="text-lg font-medium text-slate-600">What is your gender?</p>

      <div className="flex justify-between w-full px-16 gap-12">
        <CustomRadio 
          label={"Male"}
          isActive={selectedGender === "Male"}
          onClick={() => setselectedGender("Male")}
        >
          <FaMale className="h-12 w-12 text-primary"/>
        </CustomRadio>
        <CustomRadio 
          label={"Female"}
          isActive={selectedGender === "Female"}
          onClick={() => setselectedGender("Female")}
        >
          <FaFemale className="h-12 w-12 text-primary"/>
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
  )
}