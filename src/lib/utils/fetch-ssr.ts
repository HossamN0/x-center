'use server'

import { authOptions } from "@/app/api/auth"
import { getServerSession } from "next-auth"

export const fetchSSR = async (url: string) => {
    const session = await getServerSession(authOptions);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: 'GET',
        headers: {
            ...(session?.access_token) && { 'Authorization': `Bearer ${session?.access_token}` }
        }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message)
    }
    return data
}