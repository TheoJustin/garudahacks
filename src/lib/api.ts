import { EvaluationQueryResult } from "./types/embeddings.types";

interface DataInputInterface {
  email: string;
  evaluation?: EvaluationQueryResult;
}

export const sendData = async ({email, evaluation} : DataInputInterface) =>
  fetch("/api/email", {
    method: "POST",
    body: JSON.stringify({ email, evaluation }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
