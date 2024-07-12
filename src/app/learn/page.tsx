import CourseCard from "./_components/course-card";

const categoryTemp = ["Programming", "Fundamental", "Fundamental"];
const categoryTemp2 = ["Easy", "Fundamental", "Beginner", "Medium"];

export default function LearnPage() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Courses available for you!</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        <CourseCard
          image={
            "https://miro.medium.com/v2/resize:fit:1400/1*SoJOoRqbFp9fvNILpl4JNw.jpeg"
          }
          name={"Introduction to Web Programming"}
          students={1000}
          category={categoryTemp2}
        />
        <CourseCard
          image={
            "https://cdn.prod.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
          }
          name={
            "Introduction to Web Programming With ReactJS silitonga club duckcing"
          }
          students={1000}
          category={categoryTemp}
        />
        <CourseCard
          image={
            "https://images.business.com/app/uploads/2011/06/12131215/Leadership-Skills.png"
          }
          name={"Advanced Business Management"}
          students={1000}
          category={categoryTemp}
        />
        <CourseCard
          image={
            "https://cdn.prod.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
          }
          name={
            "Introduction to Web Programming With ReactJS silitonga club duckcing"
          }
          students={1000}
          category={categoryTemp}
        />
        <CourseCard
          image={
            "https://cdn.prod.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
          }
          name={
            "Introduction to Web Programming With ReactJS silitonga club duckcing"
          }
          students={1000}
          category={categoryTemp}
        />
        <CourseCard
          image={
            "https://cdn.prod.website-files.com/61b9e37d1106b57eaa076efd/629df2647290ef3b75d74f2c_a2bc81309136b0c1864f582b1af95307_546c60cadefd5c0f5e78014543c554cb.png"
          }
          name={
            "Introduction to Web Programming With ReactJS silitonga club duckcing"
          }
          students={1000}
          category={categoryTemp}
        />
      </div>
    </div>
  );
}
