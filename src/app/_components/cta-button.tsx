"use client";
import { Button } from "@/lib/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function CtaButton() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/form");
  };

  return (
    <Button className="w-36" onClick={handleRedirect}>
      Find me a job
    </Button>
  );
}