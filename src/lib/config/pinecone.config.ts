import { IndexModelMetricEnum, ServerlessSpecCloudEnum } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { PineconeService } from "../service/pinecone.service";

export const PINECONE_CONFIG = {
  similarityQuery: {
    topK: 5, // Top result limit
    includeValues: false, // exclude vector value
    includeMetadata: true, // include metadata
  },
  // namespace: "test", // Pinecone namespace
  indexName: "garudahacks", // Pinecone index name
  // embeddingID:"" // Embedding identifier
  dimensions: 1536,
  metric: IndexModelMetricEnum.Cosine, // Similarity metric
  cloud: ServerlessSpecCloudEnum.Aws,
  region: "us-east-1",
};

export const pineconeService = new PineconeService()