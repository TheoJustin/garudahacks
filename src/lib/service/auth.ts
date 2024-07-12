"use server"

import { pineconeService } from "../config/pinecone.config"
import { UserForm } from "../types/user-form.types"
import { queryJobsWithText } from "./jobs"

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

export async function getUserRecommendedJobs({userId}:{userId:string}){
    const user = await pineconeService.queryUserById({
        userId
    })

    const jobs = await queryJobsWithText({
        topK:20,
        query: user[userId].metadata?.competency as string
    })

    console.log(user)
    console.log(jobs.data.matches)
    return jobs.data.matches
}
