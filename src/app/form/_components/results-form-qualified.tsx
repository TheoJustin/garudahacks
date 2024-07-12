"use client";
import { sendData } from "@/lib/api";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { useFormContext } from "@/lib/context/form_context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function ResultsFormQualified({
  isQualified,
}: {
  isQualified: boolean;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { formData, evaluation } = useFormContext();

  return (
    <div className="h-full flex flex-col justify-between">
      <div></div>

      <div className="flex flex-col gap-5 items-center">
        <div className="relative flex items-center justify-center">
          <div
            className={`w-32 h-32 ${
              isQualified ? "bg-green-500" : "bg-red-400"
            } rounded-full`}
          ></div>
          <div
            className={`w-28 h-28 ${
              isQualified ? "bg-green-500" : "bg-red-400"
            } rounded-full absolute animate-ping-slow`}
          ></div>
          <div
            className={`w-32 h-32 ${
              isQualified ? "bg-green-500" : "bg-red-400"
            } rounded-full absolute animate-pulse`}
          ></div>
          <div className="w-32 h-32 absolute flex justify-center items-center">
            {isQualified ? (
              <FaCheck className="text-white w-14 h-14" />
            ) : (
              <RxCross2 className="text-white w-16 h-16" />
            )}
          </div>
        </div>
        <p className="font-medium text-slate-600 text-lg">
          You are{!isQualified && " not"} qualified
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center">
        {isQualified ? (
          <>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={isChecked}
                onCheckedChange={(checked: boolean) => setIsChecked(checked)}
              />
              <label
                htmlFor="terms"
                className="text-lg font-medium text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Send results to my email
              </label>
            </div>
            <Button
              className="text-xl py-6 px-14 rounded-full"
              onClick={async () => {
                if (isChecked) {
                  console.log("tes");
                  setIsDisabled(true);
                  console.log(evaluation);
                  await sendData({
                    email: formData.email ?? "josejonathan.tano@gmail.com",
                    evaluation: evaluation,
                  });
                }
                router.push("job-vacancy");
              }}
              disabled={isDisabled}
            >
              Find me a job
            </Button>
          </>
        ) : (
          <Button
            className="text-xl py-6 px-14 rounded-full"
            onClick={async () => {
              if (isChecked) {
                setIsDisabled(true);
              }
              router.push("learn");
            }}
            disabled={isDisabled}
          >
            Get my training plan
          </Button>
        )}
      </div>
    </div>
  );
}
