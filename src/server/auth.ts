import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma";
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
            authorize(credentials) {
                const user = credentials;
                return {
                    id: crypto.randomUUID(),
                    ...user
                };
                // if (!credentials?.email || !credentials?.password) {
                //     throw new Error("Email and password are required");
                // }

                // // Replace this with your own user authentication logic
                // if (credentials.email === "test@gmail.com" && credentials.password === "123456") {
                //     return { id: "1", name: "Test User", email: credentials.email };
                // }

                // throw new Error("Invalid email or password");
            },
        }),
    ],
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`, // Redirect to your our sign-in page
    },
    adapter: PrismaAdapter(db),
};
