import { Card } from "@/lib/components/ui/card";
import JobCard from "./_components/job-card";

const jobTypeTemp = ["Fulltime", "Parttime", "Intern"];

export default function JobVacancyPage() {
  return (
    <div className="flex flex-col w-full gap-3">
      <h1 className="text-4xl font-semibold">Recommended Jobs for You!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
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
  );
}
