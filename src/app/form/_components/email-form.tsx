import { FaSchool, FaSchoolFlag } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import CustomRadio from "./custom-radio";
import { useState, useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useFormContext } from "@/lib/context/form_context";
import { Input } from "@/lib/components/ui/input";

export default function EmailForm({
  onNext, queryEmail
} : {
  onNext?: () => void, 
  queryEmail? : string
} ) {

  const { formData, appendFormData } = useFormContext()
  const [email, setEmail] = useState(formData?.email || "")
  const [transform, setTransform] = useState("0")
  const [opacity, setOpacity] = useState(0)

  const next = async () => {
    
    appendFormData({
      email: email
    })

    setTransform("-50%");
    setOpacity(0)
    await new Promise(r => setTimeout(r, 600));
    
    if(onNext) {
      onNext();
    }
  }

  useEffect(() => {
    setOpacity(1)
  }, [])

  useEffect(() => {
    if(queryEmail && queryEmail !== "") {
      setEmail(queryEmail)
    }
    else if(formData?.email) {
      setEmail(formData?.email)
    }
    else {
      setEmail("")
    }
  }, [queryEmail])

  return (
    <div 
      className="w-full pt-10 gap-14 shadow-xl rounded-lg items-center flex flex-col justify-between overflow-hidden transition-all duration-700"
      style={{transform: `translateX(${transform})`, opacity: opacity}}
    >
      <div className="flex flex-col items-center">
        <p className="text-lg font-medium text-slate-600">What's your best email?</p>
        <p className="text-sm text-slate-500">We'll never share your info to anyone</p>
      </div>
      
      <div className="w-full px-24">
        <Input
          className="border-slate-400 rounded-sm" 
          placeholder="your@email.com" type={"text"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="w-full h-16 bg-primary flex justify-between items-center">
        <div></div>
        <button 
          className="p-10 text-white flex items-center gap-2 transition-all duration-200 hover:gap-5 opacity-80 hover:opacity-100"
          onClick={next}
        >
          NEXT
          <IoIosArrowRoundForward className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
