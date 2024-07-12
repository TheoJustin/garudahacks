import { UserForm } from "../types/user-form.types";
import { PineconeService } from "./pinecone.service";

const pinecone = new PineconeService();

function injectCompetencyQuery({ userForm }: { userForm: UserForm }) {}

export async function process({ userForm }: { userForm: UserForm }) {}

export async function query({ queryText }: { queryText: string }) {
  pinecone.queryEmbeddings({
    namespace: "findjobs",
    queryText,
  });
}
