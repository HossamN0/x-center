import { Environment, Pages, Routes } from "@/constants/enum";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { User as ApiUser } from "@/types/api";
import { LoginAction } from "./routes/auth";
import { signOut } from "next-auth/react";

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
        role: string
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

        const newTokens = await res.json();
        if (!res.ok) {
            signOut({ callbackUrl: `/${Routes.AUTH}/${Pages.LOGIN}` });
        }
        console.log('Refreshed tokens:', newTokens);
        console.log('res:', newTokens.access_token);
        return {
            ...token,
            access_token: newTokens.access_token,
            refresh_token: newTokens.refresh_token,
            accessTokenExpires: Date.now() + (60 * 60 * 1000),
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        signOut({ callbackUrl: `/${Routes.AUTH}/${Pages.LOGIN}` });
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