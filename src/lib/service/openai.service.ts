import OpenAI from "openai";
import dotenv from "dotenv";
import { CreateEmbeddingResponse } from "openai/resources/embeddings.mjs";

dotenv.config();

export class OpenAIService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createEmbeddings(item: any): Promise<CreateEmbeddingResponse> {
    const embedding = await this.openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: item,
    });

    return embedding;
  }
}
