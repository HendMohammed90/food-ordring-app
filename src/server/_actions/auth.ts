"use server"

import { db } from "@/lib/prisma";
import { LoginSchema, SignUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";

export const login = async (credentials: Record<"email" | "password", string> | undefined) => {
    const result = LoginSchema.safeParse(credentials);
    if (!result.success) {
        const formattedErrors = result.error.issues.map(err => err.message).join(", ");
        throw new Error(formattedErrors);
    }
    
    try {
        const user = await db.user.findUnique({
            where: { email: result.data.email }
        });
        
        if (!user) {
            throw new Error("Invalid email or password");
        }
        
        const isValidPassword = await bcrypt.compare(result.data.password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }
        
        // Remove password from user object for security
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}

export const signUp = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const result = SignUpSchema.safeParse(data);
    if (!result.success) {
        const formattedErrors = result.error.issues.map(err => err.message).join(", ");
        throw new Error(formattedErrors);
    }
    
    try {
        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email: result.data.email }
        });
        
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        
        // Create user
        const user = await db.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
            }
        });
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, message: "User created successfully" };
    } catch (error) {
        console.error("Signup error:", error);
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}

// export async function signUp(data: FormData) {

//     const name = data.get("name")?.valueOf();
//     const email = data.get("email")?.valueOf();
//     const password = data.get("password")?.valueOf();
//     const confirmPassword = data.get("confirmPassword")?.valueOf();

//     console.log({ name, email, password, confirmPassword });
// }