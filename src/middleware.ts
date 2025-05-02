import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const status = request.cookies.get("status");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") && status?.value !== "active") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/" && status?.value === "active") {
    console.log(status);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
