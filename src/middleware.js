import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export async function middleware(request) {
  const token = request.cookies.get("adminToken")?.value;

  const publicRoutes = ["/login", "/forget_password", "/reset_password"];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("adminToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/forget_password",
    "/reset_password",
  ],
};
