import { PineconeService } from "./pinecone.service";

const pinecone = new PineconeService();

const testCase1 = [
  {
    textToEmbed:
      "I have a major in computer science but im not really confident in my skill",
    skils: ["programming", "web development", "java"],
  },
];

export async function testPinecone() {
  pinecone.storeEmbeddings({
    items: testCase1,
    namespace: "test",
  });

  pinecone.queryEmbeddings({
    queryText: "what major am i?",
    namespace: "test",
  });
}
