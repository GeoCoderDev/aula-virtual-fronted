import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const token = request.cookies.get("myToken");

  // Redirect users without token to login for protected routes
  if (!pathname.startsWith("/login") && pathname !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login page with a token, redirect to home
  if (pathname.startsWith("/login") || pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/heyeyeyey", request.url));
  }

  // Continue processing for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Apply middleware to all routes
};
