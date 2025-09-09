import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Environments, Pages, Routes, UserRole } from "@/constants/enums";
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
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    console.error("NextAuth authorize error:", error);
                    // Throw the error to be handled by NextAuth's error system
                    throw new Error(error instanceof Error ? error.message : "Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`, // Redirect to your our sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub!;
                session.user.role = token.role as UserRole;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(db),
};
