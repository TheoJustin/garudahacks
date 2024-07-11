import React from "react";

export default function JobTypeBadge({jobType} : {jobType: String}) {
  return (
    <div className="bg-transparent border border-black h-fit w-fit px-2 py-1 rounded-3xl text-base font-semibold whitespace-nowrap inline-block">
      {jobType}
    </div>
  );
}
