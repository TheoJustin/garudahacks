"use server"

import { pineconeService } from "../config/pinecone.config"
import { UserForm } from "../types/user-form.types"

export async function upsertUserToPinecone({userForm, userId, metadata}:{
    userForm: Partial<UserForm>,
    userId: string | null,
    metadata: {
        competency : string
        jobs : string
        skills : string
    }
}){
    await pineconeService.insertUser({
        userForm,
        userId,
        metadata
    })
}