import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Get the pathname of the request
    const pathname = req.nextUrl.pathname

    // Handle signout cleanup
    if (pathname === "/api/auth/signout") {
      const response = NextResponse.next()
      
      // Clear NextAuth session cookies
      response.cookies.delete("next-auth.session-token")
      response.cookies.delete("__Secure-next-auth.session-token")
      response.cookies.delete("next-auth.csrf-token")
      response.cookies.delete("__Host-next-auth.csrf-token")
      
      // Clear any custom cookies if you have them
      response.cookies.delete("authjs.session-token")
      response.cookies.delete("authjs.csrf-token")
      
      return response
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Allow all requests to pass through
    },
  }
)

export const config = {
  // Run middleware on these paths
  matcher: [
    '/api/auth/:path*',
    '/profile/:path*',
    '/admin/:path*',
  ]
}
