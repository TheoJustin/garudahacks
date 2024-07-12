"use server";
import { UserForm } from "../types/user-form.types";
import { pineconeService } from "../config/pinecone.config";
import { RecordMetadataValue } from "@pinecone-database/pinecone/dist/data/types";

async function buildSkillImprovementQuery({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<string> {
  const educationLevels = [
    "Senior secondary",
    "Higher secondary",
    "Undergraduate or higher",
  ];
  const educationLevel =
    typeof userForm.educationLevel == "number"
      ? `I have an education level of ${educationLevels[userForm.educationLevel]}`
      : "";

  const gender = userForm.gender ? `I am a ${userForm.gender}.` : "";

  const description = userForm.description ? userForm.description : "";

  const workExperience = userForm.workExperience
    ? "I have previous work experience."
    : "I have no work experience.";

  let workExperiences = "";
  if (userForm.workExperience && userForm.workExperiences) {
    workExperiences = userForm.workExperiences
      .map((experience) => {
        return `I worked for ${experience.year} years as a ${experience.latestPosition} in ${experience.field}.`;
      })
      .join(" ");
  }

  const combinedText = `${gender} ${educationLevel}  ${description} ${workExperience} ${workExperiences}. With my current level of experience, skill, and ability, reccomend me a job`;
  return combinedText;
}

export async function querySkillIssue({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<RecordMetadataValue[]> {
  const query = await buildSkillImprovementQuery({
    userForm: userForm,
  });

  console.log("ke run sekali");

  const { queryResult } = await pineconeService.queryEmbeddings({
    queryText: query,
    namespace: "findjobs",
  });

  const skills = queryResult.matches
    .map((match) => match.metadata!.skills)
    .filter((skill) => !!skill);

  return skills;
}
