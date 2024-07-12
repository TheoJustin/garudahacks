import TypeBadge from "@/app/_components/type-badge";
import { Button } from "@/lib/components/ui/button";
import { Card } from "@/lib/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CourseCardInterface {
  image: string;
  name: String;
  students: Number;
  category: String[];
}

export default function CourseCard({
  image,
  name,
  category,
  students,
}: CourseCardInterface) {
  return (
    <Card className="w-full min-h-[27rem] rounded-3xl p-4 flex flex-col gap-4 justify-between">
      <div className="h-full flex flex-col gap-3 relative">
        <div className="relative">
          <Image
            width={2000}
            height={2000}
            className="w-full h-48 object-cover rounded-2xl relative"
            src={image}
            alt="coverImage"
          />
          <div className="absolute top-4 right-4 bg-white h-fit w-fit px-2 py-1 rounded-xl text-base font-semibold whitespace-nowrap inline-block hover:bg-dark hover:text-white transition-all duration-200 cursor-pointer">
            udemy.com
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {category.map((c, i) => {
            if (i < 2) {
              return <TypeBadge type={c} />;
            }
            if(i == 2){
              return <TypeBadge type={`+${category.length - 2}`} />;
            }
          })}
        </div>

        <div className="text-xl font-semibold line-clamp-2">{name}</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <User className="w-5 h-5" />
          <div className="font-normal">{students.toLocaleString()}</div>
        </div>
        <Button className="w-full bg-black rounded-xl">Enroll</Button>
      </div>
    </Card>
  );
}
