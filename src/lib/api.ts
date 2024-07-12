import { EvaluationQueryResult } from "./types/embeddings.types";

interface DataInputInterface {
  email: string;
  evaluation?: EvaluationQueryResult;
  callback: () => void;
}

export const sendAcceptedEmail = async ({
  email,
  evaluation,
  callback,
}: DataInputInterface) => {
  await fetch("/api/accepted-email", {
    method: "POST",
    body: JSON.stringify({ email, evaluation }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  callback();
};

export const sendDeclinedEmail = async ({
  email,
  evaluation,
  callback,
}: DataInputInterface) => {
  await fetch("/api/declined-email", {
    method: "POST",
    body: JSON.stringify({ email, evaluation }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  callback();
};
