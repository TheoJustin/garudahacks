import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_CONFIG } from "../config/pinecone.config";
import dotenv from "dotenv";
import { PineconeQuery } from "../types/embeddings.types";
import { openAiService } from "../config/openai.config";
import { UserForm } from "../types/user-form.types";

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

  async queryUserById({userId}: {userId:string}) {
    const index = this.pinecone.Index(PINECONE_CONFIG.indexName); 
    try {
      const queryResponse = await index.namespace("user").fetch([userId]);
      if (queryResponse.records) {
        return queryResponse.records;
      } 
      else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error querying user by ID:', error);
      throw error;
    }
  }

  async queryEmbeddings({
    queryText,
    namespace,
    topK = 5,
  }: {
    topK?: number,
    queryText: string;
    namespace: string;
  }): Promise<PineconeQuery> {
    const queryEmbedding = await openAiService.createEmbeddings({ queryText });

    const queryResult = await this.pinecone
      .index(PINECONE_CONFIG.indexName)
      .namespace(namespace)
      .query({
        ...PINECONE_CONFIG.similarityQuery,
        topK: topK,
        vector: queryEmbedding.data[0].embedding,
      });

    return {
      queryText,
      queryResult,
    };
  }

  async insertUser({
    userForm,
    userId,
    metadata
  }:{
    userForm: Partial<UserForm>,
    userId: string | null,
    metadata: {
      competency : string
      jobs : string
      skills : string
    }
  }){
    const userNs = "user"
    const combinedText = `${userForm.email} ${userForm.username}`

    const embedding = await openAiService.createEmbeddings({
      queryText:combinedText
    });

    let workExperiences = "";
    if (userForm.workExperience && userForm.workExperiences) {
      workExperiences = userForm.workExperiences
        .map((experience) => {
          return `I worked for ${experience.year} years as a ${experience.latestPosition} in ${experience.field}.`;
        })
        .join(" ");
    }

    const vector = {
      id: userId as string,
      values: embedding.data[0].embedding,
      metadata: {
        educationLevel: userForm.educationLevel ?? 0,
        email: userForm.email as string,
        username: userForm.username as string,
        score: userForm.score ?? 0,
        description: userForm.description as string,
        gender: userForm.gender as string,
        workExperience: userForm.workExperience ?? false,
        workExperiences: workExperiences as string,
        aptitudeTest: userForm.aptitudeTest ?? 0,

        competency: metadata.competency,
        job: metadata.jobs,
        skills: metadata.skills
      },
    };

    await this.pinecone
      .index(PINECONE_CONFIG.indexName)
      .namespace(userNs)
      .upsert([vector])
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
