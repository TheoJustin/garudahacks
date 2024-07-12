"use client";
import { useMemo } from "react";
import CheckboxWithLabel from "@/lib/components/checkbox-with-label";
import SteveJobs from "./_components/steve-jobs";
import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";

const jobTypeTemp = ["Fulltime", "Parttime", "Intern"];

export default function JobVacancyPage() {
  const { user } = useUser();

  const MemoizedSteveJobs = useMemo(() => {
    return <SteveJobs userId={user?.id} />;
  }, [user?.id]);

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col">
        <div className="sticky top-32 flex flex-col gap-8">
          <p className="font-medium text-xl">Filters</p>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-600">Working Hours</p>
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Full-time"
            />
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Part-time"
            />
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Internship"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-600">Field</p>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Tech" />
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Business"
            />
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Sales & Marketing"
            />
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Bio" />
            <CheckboxWithLabel
              className="opacity-80 text-slate-800"
              label="Others"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[75%] gap-3">
        <h1 className="text-4xl font-semibold mb-12">Recommended Jobs for You!</h1>
        
          <Suspense fallback={ <div className="flex w-full min-h-[60dvh] justify-center items-center flex-row gap-2">
          <div className="animate-pulse">
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
          </div>
          <div className="animate-pulse [animation-delay:-.3s]">
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
          </div>
          <div className="animate-pulse [animation-delay:-.5s]">
            <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3"></div>
        {MemoizedSteveJobs}
        </Suspense>
      </div>
    </div>
  );
}