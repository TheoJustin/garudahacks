"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { useMutation } from "react-query";
import { UserForm } from "../types/user-form.types";
import { queryCompetency } from "../service/competency";
import { EvaluationQueryResult } from "../types/embeddings.types";
import { queryJobs } from "../service/jobs";
import { querySkillIssue } from "../service/skill-issue";

type FormContextType = {
  formData: Partial<UserForm>;
  appendFormData: (data: Partial<UserForm>) => void;
  finalize: () => void;
  isLoading: boolean;
  evaluation: EvaluationQueryResult | undefined;
  requestMade: boolean;
};

export const FormContext = createContext<FormContextType>({
  formData: {},
  appendFormData: () => {},
  finalize: () => {},
  isLoading: false,
  evaluation: undefined,
  requestMade: false,
});

export const useFormContext = () => {
  return useContext(FormContext);
};

export default function FormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<Partial<UserForm>>({});
  const [requestMade, setRequestMade] = useState(false);

  const { mutate: appendFormData, isLoading: isAppendFormDataLoading } =
    useMutation(async (data: Partial<UserForm>) => {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    });

  const {
    mutate: finalizeMutation,
    isLoading: isFinalizeLoading,
    data: evaluation,
  } = useMutation(
    async () => {
      const [evaluation, skillReccomendations, jobs] = await Promise.all([
        queryCompetency({ userForm: formData }),
        querySkillIssue({ userForm: formData }),
        queryJobs({ userForm: formData }),
      ]);

      const data: EvaluationQueryResult = {
        evaluation,
        skillReccomendations,
        jobs,
      };

      console.log(data.evaluation);
      console.log(data.skillReccomendations);
      console.log(data.jobs);
      return data;
    },
    {
      onSuccess: () => {
        setRequestMade(true);
      },
    },
  );

  const finalize = useCallback(() => {
    if (!requestMade) {
      finalizeMutation();
    }
  }, [requestMade, finalizeMutation]);

  return (
    <FormContext.Provider
      value={{
        formData,
        appendFormData,
        finalize,
        isLoading: isAppendFormDataLoading || isFinalizeLoading,
        evaluation,
        requestMade,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
