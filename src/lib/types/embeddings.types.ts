import { QueryResponse, RecordMetadata } from "@pinecone-database/pinecone";

export interface EmbeddingEntry {
  textToEmbed: string;
}

export interface PineconeQuery {
  queryText: string;
  queryResult: QueryResponse<RecordMetadata>;
}
