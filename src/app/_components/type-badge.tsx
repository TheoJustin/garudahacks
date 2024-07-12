import React from "react";

export default function TypeBadge({type} : {type: String}) {
  return (
    <div className="bg-transparent border border-black h-fit w-fit px-2 py-1 rounded-3xl text-base font-semibold whitespace-nowrap inline-block hover:bg-dark hover:text-white transition-all duration-200 cursor-pointer">
      {type}
    </div>
  );
}
