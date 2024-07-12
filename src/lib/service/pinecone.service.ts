import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_CONFIG } from "../config/pinecone.config";
import dotenv from "dotenv";
import { PineconeQuery } from "../types/embeddings.types";
import { openAiService } from "../config/openai.config";

dotenv.config();

export enum ManagePineconeIndexEnum {
  Create = "CREATE",
  Delete = "DELETE",
}

export class PineconeService {
  pinecone: Pinecone;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
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

    const queryResult = await this.pinecone
      .index(PINECONE_CONFIG.indexName)
      .namespace(namespace)
      .query({
        ...PINECONE_CONFIG.similarityQuery,
        vector: queryEmbedding.data[0].embedding,
      });

    // console.log(queryText);
    // console.log(queryResult.matches);

    return {
      queryText,
      queryResult,
    };
  }

  async manageIndex(action: ManagePineconeIndexEnum) {
    const indextExists = (await this.pinecone.listIndexes()).indexes?.some(
      (index) => index.name === PINECONE_CONFIG.indexName,
    );

    if (action == ManagePineconeIndexEnum.Create) {
      if (indextExists) {
        console.error("Already exists");
        return;
      }

      await this.pinecone.createIndex({
        name: PINECONE_CONFIG.indexName,
        dimension: PINECONE_CONFIG.dimensions,
        metric: PINECONE_CONFIG.metric,
        spec: {
          serverless: {
            cloud: PINECONE_CONFIG.cloud,
            region: PINECONE_CONFIG.region,
          },
        },
      });
      return;
    }

    if (action == ManagePineconeIndexEnum.Delete) {
      if (!indextExists) {
        console.error("Does not exists");
        return;
      }
      await this.pinecone.deleteIndex(PINECONE_CONFIG.indexName);
      return;
    }
  }
}
