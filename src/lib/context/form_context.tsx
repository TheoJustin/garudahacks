'use client';

import { useRouter } from 'next/navigation';
import { createContext, useState, useContext} from 'react'
import { useMutation } from 'react-query'
import { UserForm } from '../types/user-form.types';
import { queryCompetency } from '../service/competency';

type FormContextType = {
  formData: Partial<UserForm>,
  appendFormData: (data: Partial<UserForm>) => void,
  finalize: () => void,
  isLoading: boolean
}

export const FormContext = createContext<FormContextType>({
  formData: {},
  appendFormData: ()=>{},
  finalize: ()=>{},
  isLoading:false
})

export const useFormContext = () => {
  return useContext(FormContext)
}

export default function FormContextProvider({
  children
} : {
  children: React.ReactNode
}) {

  const [formData, setFormData] = useState<Partial<UserForm>>({});

  const { mutate: appendFormData, isLoading: isAppendFormDataLoading } = useMutation(
    async (data: Partial<UserForm>) => {
      setFormData((prev) => ({
          ...prev,
          ...data
      }));
    }
  );

  const {mutate:finalize, isLoading:isFinalizeLoading} = useMutation(
    async ()=>{

      // TODO: Do some validation here

      await queryCompetency({
        userForm:formData
      })
      // TODO: Call the API to create the Form
    },
    {
        onSuccess:(data)=>{
            // toast("Form successfully created!") 
            console.log(data)
        },
        onError:(error:Error)=>{
            // toast.error(error.message,{
            //     icon:<AlertCircle className='w-full'/>
            // })
        }
    }
)

  return (
    <FormContext.Provider value={{
      formData,
      appendFormData,
      finalize,
      isLoading: isAppendFormDataLoading || isFinalizeLoading
    }}>
      {children}
    </FormContext.Provider>
  )
}