import { Environment, Pages, Routes } from "@/constants/enum";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { LoginAction } from "./actions/auth";
import { User as ApiUser } from "@/types/api";

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

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 14 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token
                token.refresh_token = user.refresh_token
                token.name = `${user.user.first_name} ${user.user.last_name}`
                token.role = user.user.roles[0].name
            }
            return token;
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
                const res = await LoginAction(credentials);
                if (!res.success) throw new Error(res.error);
                return res?.data as any;
            }
        })
    ],
    pages: {
        signIn: `${Routes.AUTH}/${Pages.LOGIN}`
    }
}