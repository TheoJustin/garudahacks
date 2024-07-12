"use server";
import { UserForm } from "../types/user-form.types";
import { pineconeService } from "../config/pinecone.config";
import { CompetencyRatio, WithQuery } from "../types/embeddings.types";

interface QueryResult{
  result : boolean
  query : string
}

async function buildCompetencyQuery({
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
  const averageScore = userForm.score
    ? `With an average score of ${userForm.score}.`
    : "";

  const gender = userForm.gender ? `I am a ${userForm.gender}.` : "";

  const description = userForm.description ? userForm.description : "";

  const workExperience = userForm.workExperience
    ? "I have previous work experience."
    : "I have no work experience.";

  const aptitudeText =
    userForm.aptitudeTest === 0 || userForm.aptitudeTest == undefined
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

export async function queryCompetency({
  userForm,
}: {
  userForm: Partial<UserForm>;
}): Promise<WithQuery<CompetencyRatio>> {
  const total = 10
  const query = await buildCompetencyQuery({
    userForm: userForm,
  });

  console.log("queried one time");

  const { queryText, queryResult } = await pineconeService.queryEmbeddings({
    topK: total,
    queryText: query,
    namespace: "jobs",
  });

  const evaluation = queryResult.matches[0].metadata?.label;
  const result = (evaluation == "Placed")

  let placedCount:number = 0

  queryResult.matches.map((match)=>{
    if(match.metadata?.label === "Placed") placedCount +=1
  })

  const competencyRatio = {
    evaluation: (placedCount > (total/2)),
    total,
    placedCount
  }

  return {
    data : competencyRatio,
    query : queryText
  };
}
