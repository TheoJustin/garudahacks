"use server"

import { pineconeService } from "../config/pinecone.config"
import { UserForm } from "../types/user-form.types"

export async function upsertUserToPinecone({userForm, userId}:{
    userForm: Partial<UserForm>,
    userId: string | null
}){
    await pineconeService.insertUser({
        userForm,
        userId
    })
}