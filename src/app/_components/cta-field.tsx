"use client";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function CtaField({
  className="w-[75%]"
} : {
  className?: string
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleRedirect = () => {

    if(email !== "") {
      router.push(`/form?email=${email}`);
    } else {
      router.push("/form");
    }
  };

  return (
    <div className={`${className} flex items-center justify-end`}>
      <Input className="bg-white py-7" placeholder="Type Your Email"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="flex gap-4 w-fit px-8 absolute mr-2" onClick={handleRedirect}>
        Find me a job
        <IoMdSearch className="text-lg"/>
      </Button>
    </div>
  );
}
