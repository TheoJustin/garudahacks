'use client';

import { createContext, useState, useContext, useCallback } from 'react'
import { useMutation } from 'react-query'
import { UserForm } from '../types/user-form.types';
import { queryCompetency } from '../service/competency';

type FormContextType = {
  formData: Partial<UserForm>,
  appendFormData: (data: Partial<UserForm>) => void,
  finalize: () => void,
  isLoading: boolean,
  evaluation: boolean | undefined,
  requestMade: boolean
}

export const FormContext = createContext<FormContextType>({
  formData: {},
  appendFormData: ()=>{},
  finalize: ()=>{},
  isLoading:false,
  evaluation: undefined,
  requestMade: false
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
  const [requestMade, setRequestMade] = useState(false);

  const { mutate: appendFormData, isLoading: isAppendFormDataLoading } = useMutation(
    async (data: Partial<UserForm>) => {
      setFormData((prev) => ({
          ...prev,
          ...data
      }));
    }
  );

  const { mutate: finalizeMutation, isLoading: isFinalizeLoading, data: evaluation } = useMutation(
    async () => {
      return await queryCompetency({
        userForm: formData
      });
    },
    {
      onSuccess: (data) => {
        setRequestMade(true);
      }
    }
  );

  const finalize = useCallback(() => {
    if (!requestMade) {
      finalizeMutation();
    }
  }, [requestMade, finalizeMutation]);

  return (
    <FormContext.Provider value={{
      formData,
      appendFormData,
      finalize,
      isLoading: isAppendFormDataLoading || isFinalizeLoading,
      evaluation,
      requestMade
    }}>
      {children}
    </FormContext.Provider>
  );
}