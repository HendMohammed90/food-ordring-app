import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"
import { redirect } from "next/navigation"
import { Routes, Pages } from "@/constants/enums"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${Routes.AUTH}/${Pages.LOGIN}`)
  }

  return (
    <main className="p-8">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <p className="text-lg">{session.user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <p className="text-lg">{session.user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <p className="text-lg capitalize">{session.user.role.toLowerCase()}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">User ID</label>
              <p className="text-sm text-muted-foreground font-mono">{session.user.id}</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground text-center">
              This is a basic profile page. Future features could include editing profile information, order history, and preferences.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
