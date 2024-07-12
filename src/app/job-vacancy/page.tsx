import CheckboxWithLabel from "@/lib/components/checkbox-with-label";
import { Card } from "@/lib/components/ui/card";
import { Checkbox } from "@/lib/components/ui/checkbox";
import JobCard from "./_components/job-card";

const jobTypeTemp = ["Fulltime", "Parttime", "Intern"];

export default function JobVacancyPage() {
  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col">
        <div className="sticky top-32 flex flex-col gap-8">
          <p className="font-medium text-xl">Filters</p>
          
          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-600">Working Hours</p>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Full-time"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Part-time"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Internship"/>
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-600">Field</p>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Tech"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Business"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Sales & Marketing"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Bio"/>
            <CheckboxWithLabel className="opacity-80 text-slate-800" label="Others"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[75%] gap-3">
        <h1 className="text-4xl font-semibold mb-12">Recommended Jobs for You!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          <JobCard
            logo={"a"}
            company={"Google"}
            numberOfSlots={200}
            position={"Backend Engineer"}
            startingSalary={25000000}
            jobType={jobTypeTemp}
          />
          <JobCard
            logo={"a"}
            company={"Google"}
            numberOfSlots={100}
            position={"Frontend Engineer"}
            startingSalary={100000000}
            jobType={jobTypeTemp}
          />
          <JobCard
            logo={"a"}
            company={"Google"}
            numberOfSlots={10}
            position={"Machine Learning Developer"}
            startingSalary={80000000}
            jobType={jobTypeTemp}
          />
          <JobCard
            logo={"a"}
            company={"Google"}
            numberOfSlots={20}
            position={"AI Manager"}
            startingSalary={15000000}
            jobType={jobTypeTemp}
          />

        </div>
      </div>

    </div>
  );
}
