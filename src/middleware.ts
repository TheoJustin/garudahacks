import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/job-vacancy"],
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return response;
}
