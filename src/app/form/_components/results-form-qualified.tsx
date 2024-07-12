"use client";
import { sendData } from "@/lib/api";
import { useState } from "react";
import { useFormContext } from "@/lib/context/form_context";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useSignUp, useSignIn, SignUpButton, SignOutButton } from "@clerk/nextjs";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/credenza";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { upsertUserToPinecone } from "@/lib/service/auth";

interface ResultsFormQualifiedProps {
  isQualified: boolean;
}

export default function ResultsFormQualified({
  isQualified,
}: ResultsFormQualifiedProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();
  const { formData, evaluation, appendFormData } = useFormContext();


  const handleSignUp = async () => {
    try {
      if (!signUp) return;

      
      const signUpAttempt = await signUp.create({
        username:username,
        emailAddress: formData.email as string,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);

      appendFormData({
        username:username
      })
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signUp) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        await upsertUserToPinecone({
          userForm:formData,
          userId:completeSignUp.createdUserId
        })
        setVerifying(false)
        router.push("/job-vacancy")
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };


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
        <Credenza>
        
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
            <CredenzaTrigger asChild>
            <Button
              className="text-xl py-6 px-14 rounded-full"
              onClick={async () => {
                if (isChecked) {
                  console.log("tes");
                  setIsDisabled(true);
                  await sendData({
                    email: formData.email ?? "josejonathan.tano@gmail.com",
                    evaluation: evaluation,
                  });
                }
              }}
              disabled={isDisabled}
            >
              Find me a job
            </Button>
            </CredenzaTrigger>
          </>
        ) 
        : 
        (
          <CredenzaTrigger asChild>
            <Button
              className="text-xl py-6 px-14 rounded-full"
              disabled={isDisabled}
            >
              Get my training plan
            </Button>
          </CredenzaTrigger>
        )}
        <CredenzaContent className="pt-10 w-full p-8">
        <CredenzaHeader>
          <CredenzaTitle className="font-medium text-base lg:text-xl">
            Create your personalized experience
          </CredenzaTitle>
          <CredenzaDescription>
            We've sent you your results to your email! Create an account to help us understand you better and give a
            tailored experience based on your expertise
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
        {!verifying ? (
              <div className="flex flex-col gap-4 w-full mt-4">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-2"
                />
                <Button className="mt-4 w-full" onClick={handleSignUp}>
                  Sign Up
                </Button>
                <Button className="mt-4 w-full" onClick={()=>router.push("/job-vacancies")}>
                  No thanks
                </Button>
                <SignOutButton>
                  Sign out
                </SignOutButton>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full mt-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <Button className="mt-4" onClick={handleVerify}>
                  Verify
                </Button>
              </div>
            )}
        </CredenzaBody>
        </CredenzaContent>
        </Credenza>
      </div>
    </div>
  );
}
