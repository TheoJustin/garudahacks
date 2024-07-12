"use server"
import { UserForm } from "../types/user-form.types";
import {pinecone} from "../config/pinecone.config"

async function buildCompetencyQuery({userForm}: {userForm:Partial<UserForm>}): Promise<string> {
  const educationLevels = [
    "Senior secondary",
    "Higher secondary",
    "Undergraduate or higher",
  ];
  const educationLevel = (typeof(userForm.educationLevel) == 'number')
    ? `I have an education level of ${educationLevels[userForm.educationLevel]}`
    : "";
  const averageScore = userForm.score
    ? `With an average score of ${userForm.score}.`
    : "";

  const gender = userForm.gender ? `I am a ${userForm.gender}.` : "";

  const description = userForm.description ? userForm.description : "";

  const workExperience = userForm.workExperience
    ? "I have previous work experience."
    : "I have no work experience.";

  const aptitudeText =
    (userForm.aptitudeTest === 0 || userForm.aptitudeTest == undefined)
      ? "I have not taken an aptitude test."
      : `My aptitude test score is ${userForm.aptitudeTest}.`;

  let workExperiences = "";
  if (userForm.workExperience && userForm.workExperiences) {
    workExperiences = userForm.workExperiences
      .map((experience) => {
        return `I worked for ${experience.year} years as a ${experience.latestPosition} in ${experience.field}.`;
      })
      .join(" ");
  }

  const combinedText = `${gender} ${educationLevel} ${averageScore} ${aptitudeText} ${description} ${workExperience} ${workExperiences}. Am i qualified for a job?`;
  return combinedText;
}

export async function process({ userForm }: { userForm: UserForm }) {}


export async function queryCompetency({ userForm }: { userForm: Partial<UserForm> }):Promise<boolean> {
  const query = await buildCompetencyQuery({
    userForm: userForm
  })

  console.log("ke run sekali")
  console.log(query)
  const {queryText, queryResult} = await pinecone.queryEmbeddings({
    queryText:query,
    namespace:"jobs"
  })

  const evaluation = queryResult.matches[0].metadata?.label

  return (evaluation == "Placed")

}