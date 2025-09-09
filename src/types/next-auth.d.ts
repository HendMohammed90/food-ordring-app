import { User, UserRole } from "../../prisma/generated/prisma"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User
  }

}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    role: UserRole
  }
}
