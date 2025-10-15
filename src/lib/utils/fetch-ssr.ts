'use server'

import { authOptions } from "@/app/api/auth"
import { getServerSession } from "next-auth"

export const fetchSSR = async (url: string) => {
    try {
        const session = await getServerSession(authOptions);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            method: 'GET',
            headers: {
                ...(session?.access_token && { 'Authorization': `Bearer ${session.access_token}` }),
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            if (data?.message === "No courses found") {
                return { data: [], total: 0, message: "No courses found" };
            }
            throw new Error(data?.message || "Failed to fetch data");
        }

        return data;
    } catch (error) {
        return { data: [], total: 0, message: "Failed to load data" };
    }
};
