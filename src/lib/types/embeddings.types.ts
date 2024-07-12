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
  evaluation: WithQuery<boolean> | undefined;
  skillReccomendations: WithQuery<RecordMetadataValue[]> | undefined;
  jobs: WithQuery<QueryResponse<RecordMetadata>> | undefined;
}

export interface WithQuery<T> {
  data : T
  query : string
}