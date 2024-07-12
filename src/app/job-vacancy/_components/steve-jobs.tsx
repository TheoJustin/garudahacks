import { getUserRecommendedJobs } from '@/lib/service/auth';
import React from 'react';
import JobCard from './job-card';

const companyHire = [
  {
    name: "Google",
    src: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
  },
  {
    name: "Meta",
    src: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
  },
  {
    name: "Traveloka",
    src: "https://i.pinimg.com/originals/d5/da/ee/d5daeeaca986fb2655a4965884c0d6ea.png",
  },
  {
    name: "Apple",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA5r0_FrSjm2OgttQLwh_CnVCnzbJ7dLv6oA&s",
  },
  {
    name: "Gojek",
    src: "https://static-00.iconduck.com/assets.00/gojek-icon-512x512-dyy6mlv4.png",
  }
];

export default async function SteveJobs({ userId }: { userId: string | undefined }) {
  if (!userId) return;

  const res = await getUserRecommendedJobs({
    userId,
  });

  return (
    <>
      {res.map((r, index) => {
        const randomIndex = Math.floor(Math.random() * companyHire.length);
        const company = companyHire[randomIndex];

        return (
          <JobCard
            key={index}
            logo={company.src}
            company={company.name}
            numberOfSlots={20}
            position={r.metadata?.Job as string}
            startingSalary={15000000}
            jobType={[r.metadata?.role as string]}
          />
        );
      })}
    </>
  );
}