import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === Environments.DEV,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your.email address" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const res = await login(credentials);
                if (res.status !== 200 && res.user) {
                    return res.user;
                } else {
                    throw new Error(res.message || "Login failed");
                }
            },
        }),
    ],
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`, // Redirect to your our sign-in page
    },
    adapter: PrismaAdapter(db),
};
