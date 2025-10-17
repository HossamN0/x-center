import { Environment, Pages, Routes } from "@/constants/enum";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { User as ApiUser } from "@/types/api";
import { LoginAction } from "./routes/auth";

declare module "next-auth" {
    interface User {
        user: ApiUser,
        access_token: string,
        refresh_token: string
    }
    interface Session {
        user: User;
        access_token: string,
        refresh_token: string
        name: string
        role: string;
        error?: string;
    }
}

async function refreshAccessToken(token: any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
            method: 'post',
            body: JSON.stringify({
                refresh_token: token.refresh_token,
                access_token: token.access_token,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        console.log('access token', token.access_token);
        console.log('refresh token', token.refresh_token);

        const newTokens = await res.json();

        if (!res.ok || !newTokens.access_token) {
            console.error("Refresh failed:", newTokens);
            return {
                ...token,
                error: "RefreshAccessTokenError",
                access_token: null,
                refresh_token: null,
            };
        }

        return {
            ...token,
            access_token: newTokens.access_token,
            refresh_token: newTokens.refresh_token,
            accessTokenExpires: Date.now() + (23 * 60 * 60 * 1000),
        }
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
            access_token: null,
            refresh_token: null,
        };
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 14 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    name: `${user.user.first_name} ${user.user.last_name}`,
                    role: user.user.roles[0].name,
                    accessTokenExpires: Date.now() + (60 * 60 * 1000),
                };
            }
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.access_token = token.access_token as string;
            session.refresh_token = token.refresh_token as string;
            session.name = token.name as string;
            session.role = token.role as string;

            if (token.error === "RefreshAccessTokenError") {
                session.error = "RefreshAccessTokenError";
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: Environment.DEVELOPMENT === process.env.BACKEND_ENV,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            authorize: async (credentials: any) => {
                const res = await LoginAction({ data: credentials });
                return res?.data as any;
            }
        })
    ],
    pages: {
        signIn: `${Routes.AUTH}/${Pages.LOGIN}`
    }
}