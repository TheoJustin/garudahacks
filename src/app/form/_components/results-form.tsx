"use client"
import { useFormContext } from "@/lib/context/form_context";
import { useEffect, useState } from "react"
import ResultsFormQualified from "./results-form-qualified";

export default function ResultsForm({
  setCurrentStep
} : {
  setCurrentStep : (step : number) => void
}) {

  const [opacity, setOpacity] = useState(0);
  const [isQualified, setIsQualified] = useState(false);
  const [loading, setLoading] = useState(true);
  const formContext = useFormContext();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setOpacity(1)
  
      formContext.finalize();
  
      //  TODO: Some logic untuk determine dia qualified ato ga
      await new Promise(r => setTimeout(r, 1000));
      
      // Animate Transition
      setOpacity(0);
      await new Promise(r => setTimeout(r, 300));
      setLoading(false);
      setOpacity(1);
      setIsQualified(true);

    })();
  }, [])

  return (
    <>
    <div className="flex justify-center items-center h-full transition-all duration-300" style={{opacity: opacity}}>
      
      {
        // This page still require some design work
        loading ? (
          <div className="flex flex-row gap-2">
            <div className="animate-pulse">
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
            </div>
            <div className="animate-pulse [animation-delay:-.3s]">
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
            </div>
            <div className="animate-pulse [animation-delay:-.5s]">
              <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        ) : (
          <ResultsFormQualified isQualified={isQualified}/>
        )
      }
    </div>
    </>
  )
}