import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_CONFIG } from "../config/pinecone.config";
import dotenv from "dotenv";
import { OpenAIService } from "./openai.service";
import { PineconeQuery } from "../types/embeddings.types";

dotenv.config();

let openAiService = new OpenAIService();

export class PineconeService {
  pinecone: Pinecone;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string, // TODO: help
    });
  }

  async storeEmbeddings({
    items,
    namespace,
  }: {
    items: any[];
    namespace: string;
  }) {
    await Promise.all(
      items.map(async (item, i) => {
        const embedding = await openAiService.createEmbeddings(
          item.textToEmbed,
        );
        const indexName = PINECONE_CONFIG.indexName;

        const id = `test-${i + 1}`;

        await this.pinecone
          .index(indexName)
          .namespace(namespace)
          .upsert([
            {
              id: id,
              values: embedding.data[0].embedding,
              metadata: { ...item },
            },
          ]);
      }),
    );
  }

  async queryEmbeddings({
    queryText,
    namespace,
  }: {
    queryText: string;
    namespace: string;
  }): Promise<PineconeQuery> {
    const queryEmbedding = await openAiService.createEmbeddings({ queryText });
    console.log(queryEmbedding);

    const queryResult = await this.pinecone
      .index(PINECONE_CONFIG.indexName)
      .namespace(namespace)
      .query({
        ...PINECONE_CONFIG.similarityQuery,
        vector: queryEmbedding.data[0].embedding,
      });

    console.log(queryText);
    console.log(queryResult.matches);

    return {
      queryText,
      queryResult,
    };
  }

  // async manageIndex(action: string) {
  //   const indextExists = (await this.pinecone.listIndexes()).indexes?.some((index)=> index.name === PINECONE_CONFIG.indexName)
  //
  //   if (action == "CREATE"){
  //     if(indextExists){
  //       console.log("Already exists")
  //       return;
  //     }
  //
  //     await pc.createIndex({
  //       name: PINECONE_CONFIG.indexName,
  //       dimension: PINECONE_CONFIG.dimensions,
  //       metric: PINECONE_CONFIG.metric,
  //       spec: {
  //         serverless :{
  //           cloud: PINECONE_CONFIG.cloud,
  //           region: PINECONE_CONFIG.region
  //         }
  //       }
  //     });
  //   }
  // }
}
