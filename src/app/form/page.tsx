'use client'

import FormContextProvider from '@/lib/context/form_context'
import { useState } from 'react'
import AptitudeForm from './_components/aptitude-form'
import CustomRadio from "./_components/custom-radio"
import EducationForm from "./_components/education-form"
import EmailForm from './_components/email-form'
import ResultsForm from './_components/results-form'
import ScoreForm from './_components/score-form'
import WorkForm from './_components/work-form'

export default function FormPage() {

    const [currentStep, setCurrentStep] = useState(0)

    return (
      <FormContextProvider>
        <div className="w-full h-full flex items-center flex-col">
          <div className="w-full h-16 flex items-center justify-center bg-primary text-white text-lg font-bold">EasyWork</div>

            <div className="w-[70vw] h-[80vh] flex items-center justify-center p-8 overflow-hidden">
              {
                currentStep === 0 ? (
                  <EmailForm onNext={() => setCurrentStep(1)}/>
                ) : currentStep === 1 ? (
                  <EducationForm onNext={() => setCurrentStep(2)} onPrevious={() => setCurrentStep(0)}/>
                ) : currentStep === 2 ? (
                  <ScoreForm onNext={() => setCurrentStep(3)} onPrevious={() => setCurrentStep(1)}/>
                ) : currentStep === 3 ? (
                  <WorkForm onNext={() => setCurrentStep(4)} onPrevious={() => setCurrentStep(2)}/>
                ) : currentStep === 4 ? (
                  <AptitudeForm onNext={() => setCurrentStep(5)} onPrevious={() => setCurrentStep(3)} />
                ) : (
                  <ResultsForm setCurrentStep={setCurrentStep}/>
                )
              }
          </div>
        </div>
      </FormContextProvider>
    )
}