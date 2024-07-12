"use client";

import FormContextProvider from '@/lib/context/form_context'
import { useState } from 'react'
import AptitudeForm from './_components/aptitude-form'
import CustomRadio from "./_components/custom-radio"
import DescribeForm from './_components/describe-form'
import EducationForm from "./_components/education-form"
import EmailForm from './_components/email-form'
import GenderForm from './_components/gender-form'
import ResultsForm from './_components/results-form'
import ScoreForm from './_components/score-form'
import WorkForm from './_components/work-form'

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);

    // const [currentStep, setCurrentStep] = useState(0)
    const [email, setEmail] = useState("");

    return (
      <FormContextProvider>
        <div className="w-full h-full flex items-center flex-col">
          <div className="w-full h-16 flex items-center justify-center bg-primary text-white text-lg font-bold">EasyWork</div>
          <div className='w-full h-2'>
            <div className='h-full bg-blue-400 transition-all duration-400' style={{width: currentStep / 7 * 100 + "%"}}></div>
          </div>

            <div className="w-[70vw] h-[80vh] flex items-center justify-center p-8 overflow-hidden">
              {
                currentStep === 0 ? (
                  <EmailForm onNext={() => setCurrentStep(1)}/>
                ) : currentStep === 1 ? (
                  <GenderForm onNext={() => setCurrentStep(2)} onPrevious={() => setCurrentStep(0)}/>
                ) : currentStep === 2 ? (
                  <DescribeForm onNext={() => setCurrentStep(3)} onPrevious={() => setCurrentStep(1)}/>
                ) : currentStep === 3 ? (
                  <EducationForm onNext={() => setCurrentStep(4)} onPrevious={() => setCurrentStep(2)}/>
                ) : currentStep === 4 ? (
                  <ScoreForm onNext={() => setCurrentStep(5)} onPrevious={() => setCurrentStep(3)}/>
                ) : currentStep === 5 ? (
                  <WorkForm onNext={() => setCurrentStep(6)} onPrevious={() => setCurrentStep(4)}/>
                ) : currentStep === 6 ? (
                  <AptitudeForm onNext={() => setCurrentStep(7)} onPrevious={() => setCurrentStep(5)} />
                ) : (
                  <ResultsForm setCurrentStep={setCurrentStep}/>
                )
              }
          </div>
        </div>
    </FormContextProvider>
  );
}
