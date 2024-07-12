"use client"
import { Button } from "@/lib/components/ui/button"
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx";

export default function ResultsFormQualified({
  isQualified
} : {
  isQualified : boolean
}) {

  const router = useRouter();

  return (
    <div className="h-full flex flex-col justify-between">
      <div></div>

      <div className="flex flex-col gap-5 items-center">
        <div className="relative flex items-center justify-center">
            <div className={`w-32 h-32 ${isQualified ? "bg-green-500" : "bg-red-400"} rounded-full`}></div>
            <div className={`w-28 h-28 ${isQualified ? "bg-green-500" : "bg-red-400"} rounded-full absolute animate-ping-slow`}></div>
            <div className={`w-32 h-32 ${isQualified ? "bg-green-500" : "bg-red-400"} rounded-full absolute animate-pulse`}></div>
            <div className="w-32 h-32 absolute flex justify-center items-center">
              {
                isQualified ? <FaCheck className="text-white w-14 h-14" /> : (
                  <RxCross2 className="text-white w-16 h-16" />
                )
              }
              
            </div>
        </div>
        <p className="font-medium text-slate-600 text-lg">You are{!isQualified && " not"} qualified</p>
      </div>
      
      {
        isQualified ? (
          <Button 
            className="text-xl py-6 px-14 rounded-full"
            onClick={() => router.push("job-vacancy")}
          >
            Find me a job
          </Button>
        ) : (
          <Button 
            className="text-xl py-6 px-14 rounded-full"
            onClick={() => {}}
          >
            Get my training plan
          </Button>
        )
      }
    </div> 
  )
}