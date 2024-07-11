export const PINECONE_CONFIG = {
  similarityQuery: {
    topK: 10, // Top result limit
    includeValues: false, // exclude vector value
    includeMetadata: true, // include metadata
  },
  // namespace: "test", // Pinecone namespace
  indexName: "garudahacks", // Pinecone index name
  // embeddingID:"" // Embedding identifier
  dimensions: 1536,
  metric: "cosine", // Similarity metric
  cloud: "aws",
  region: "us-east-1",
};
