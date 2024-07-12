"use client";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdSearch } from "react-icons/io";

export default function CtaButton() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/form");
  };

  return (
    <div className="w-[75%] flex items-center justify-end">
      <Input className="bg-white py-7" placeholder="Type Your Dream Job"/>
      <Button className="flex gap-4 w-fit px-8 absolute mr-2" onClick={handleRedirect}>
        Find me a job
        <IoMdSearch className="text-lg"/>
      </Button>
    </div>
  );
}
