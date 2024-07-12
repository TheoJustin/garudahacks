import {
  QueryResponse,
  RecordMetadata,
  RecordMetadataValue,
} from "@pinecone-database/pinecone";

export interface EmbeddingEntry {
  textToEmbed: string;
}

export interface PineconeQuery {
  queryText: string;
  queryResult: QueryResponse<RecordMetadata>;
}

export interface EvaluationQueryResult {
  evaluation: boolean | undefined;
  skillReccomendations: RecordMetadataValue[] | undefined;
  jobs: QueryResponse<RecordMetadata> | undefined;
}
