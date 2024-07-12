"use server"
import { UserForm } from "../types/user-form.types";
import {pinecone} from "../config/pinecone.config"

async function buildJobsQuery({userForm}: {userForm:Partial<UserForm>}): Promise<string> {
  const gender = userForm.gender ? `${userForm.gender}` : "";

  const description = userForm.description ? `this person's description implies that ${userForm.description}` : "";
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

export async function process({ userForm }: { userForm: UserForm }) {}


export async function queryCompetency({ userForm }: { userForm: Partial<UserForm> }) {
  const query = await buildJobsQuery({
    userForm: userForm
  })

  console.log(query)
  pinecone.queryEmbeddings({
    queryText:query,
    namespace:"findjobs"
  })
}