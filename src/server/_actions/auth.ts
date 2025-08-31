"use server"

import { db } from "@/lib/prisma";
import { LoginSchema } from "@/validations/auth";
import bcrypt from "bcrypt";

export const login = async (credentials: Record<"email" | "password", string> | undefined) => {
    const result = LoginSchema.safeParse(credentials);
    if (!result.success) {
        const formattedErrors = result.error.message;
        throw new Error(formattedErrors);
    }
    try {
        const user = db.user.findUnique({
            where: { email: result.data.email }
        });
        if (!user) {
            // console.log()
            return { message: "Invalid email or password", status: 401 }
        }
        const hashedPassword = result.data.password;
        const isValidPassword = await bcrypt.compare(result.data.password, hashedPassword);
        if (!isValidPassword) {
            return { message: "Invalid email or password", status: 401 }
        }
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { password, ...userWithoutPassword } = user;
        return { user, status: 200, message: "Login successful" };
    } catch (error) {
        return { message: "Something went wrong", status: 500 }
    }
}

// export async function signUp(data: FormData) {

//     const name = data.get("name")?.valueOf();
//     const email = data.get("email")?.valueOf();
//     const password = data.get("password")?.valueOf();
//     const confirmPassword = data.get("confirmPassword")?.valueOf();

//     console.log({ name, email, password, confirmPassword });
// }