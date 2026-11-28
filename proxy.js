
import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isAuthenticated = !!session?.user;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isProtectedRoute =
    pathname.startsWith("/workspace") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile");

  // 1. Unauthenticated users cannot access protected routes
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users should not revisit login/register
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/workspace", req.url));
  }

  // 3. Only admins can access admin routes
  if (
    isAuthenticated &&
    pathname.startsWith("/admin") &&
    session.user.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/workspace", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/workspace/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};
