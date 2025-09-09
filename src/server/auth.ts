import Credentials from "next-auth/providers/credentials";
import { DefaultSession, NextAuthOptions, User } from "next-auth";
import { Environments, Pages, Routes, UserRole } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends Partial<User> {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    }
}

export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === Environments.DEV,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 60 * 60, // 1 hour
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
        jwt: async ({ token }): Promise<JWT> => {
            const dbUser = await db.user.findUnique({
                where: {
                    email: token?.email,
                },
            });
            if (!dbUser) {
                return token;
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role as UserRole,
                image: dbUser.image,
                city: dbUser.city,
                country: dbUser.country,
                phone: dbUser.phone,
                postalCode: dbUser.postalCode,
                streetAddress: dbUser.streetAddress,
            };
        },
        session: ({ session, token }: { session: any; token: JWT }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.image = token.image as string;
                session.user.country = token.country as string;
                session.user.city = token.city as string;
                session.user.postalCode = token.postalCode as string;
                session.user.streetAddress = token.streetAddress as string;
                session.user.phone = token.phone as string;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    image: token.image,
                },
            };
        },
    },
    adapter: PrismaAdapter(db),
};