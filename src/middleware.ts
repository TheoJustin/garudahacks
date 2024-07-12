import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Initialize and export the Clerk middleware
export default clerkMiddleware();

// Configure the middleware to match specific routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Custom middleware to handle additional logic if needed
export async function middleware(request: NextRequest) {
  // Proceed with the request
  const response = NextResponse.next();

  // Additional middleware logic can be added here

  return response;
}
