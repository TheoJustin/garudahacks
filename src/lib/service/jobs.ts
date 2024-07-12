"use server";
import { UserForm } from "../types/user-form.types";
import { pineconeService } from "../config/pinecone.config";
import { RecordMetadata } from "@pinecone-database/pinecone/dist/data/types";
import { QueryResponse } from "@pinecone-database/pinecone";

async function buildJobsQuery({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<string> {
  const gender = userForm.gender ? `${userForm.gender}` : "";

  const description = userForm.description
    ? `this person's description implies that ${userForm.description}`
    : "";
  let workExperiences = "";
  if (userForm.workExperience && userForm.workExperiences) {
    workExperiences = userForm.workExperiences
      .map((experience) => {
        return `I worked for ${experience.year} years as a ${experience.latestPosition} in ${experience.field}.`;
      })
      .join(" ");
  }

  const combinedText = `This company preferenced ${gender} gender, ${description}. ${workExperiences} What jobs am i qualified for?`;
  return combinedText;
}

export async function queryJobs({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<QueryResponse<RecordMetadata>> {
  const query = await buildJobsQuery({
    userForm: userForm,
  });

  console.log("run just once");

  const { queryResult } = await pineconeService.queryEmbeddings({
    queryText: query,
    namespace: "findjobs",
  });

  return queryResult;
}
