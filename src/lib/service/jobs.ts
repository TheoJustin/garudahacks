"use server";
import { UserForm } from "../types/user-form.types";
import { pineconeService } from "../config/pinecone.config";
import { RecordMetadata } from "@pinecone-database/pinecone/dist/data/types";
import { QueryResponse } from "@pinecone-database/pinecone";
import { WithQuery } from "../types/embeddings.types";

// interface QueryResult{
//   result : QueryResponse<RecordMetadata>
//   query : string
// }

async function buildJobsQuery({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<string> {
  const gender = userForm.gender ? `${userForm.gender}` : "";

  const description = userForm.description ? `${userForm.description}` : "";

  const workExperience = userForm.workExperience
    ? "I have previous work experience,"
    : "I have no work experience.";
  let workExperiences = "";
  if (userForm.workExperience && userForm.workExperiences) {
    workExperiences = userForm.workExperiences
      .map((experience) => {
        return `I worked for ${experience.year} years as a ${experience.latestPosition} in ${experience.field}.`;
      })
      .join(" ");
  }

  const combinedText = `I am a ${gender}, ${description}. ${workExperience} ${workExperiences} What jobs am i qualified for?`;
  return combinedText;
}

export async function queryJobs({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<WithQuery<QueryResponse<RecordMetadata>>> {
  const query = await buildJobsQuery({
    userForm: userForm,
  });

  console.log("run just once");

  const {queryText, queryResult } = await pineconeService.queryEmbeddings({
    queryText: query,
    namespace: "findjobs",
  });

  return {
    data : queryResult,
    query : queryText
  };
}

export async function queryJobsWithText({
  topK,
  query,
}: {
  topK :number
  query: string;
}): Promise<WithQuery<QueryResponse<RecordMetadata>>> {
  
  console.log("run just once");

  const {queryText, queryResult } = await pineconeService.queryEmbeddings({

    topK: topK,
    queryText: query,
    namespace: "findjobs",
  });

  return {
    data : queryResult,
    query : queryText
  };
}
