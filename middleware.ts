import { getSession, updateSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.password.startsWith("/protected")) {
    const session = await getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/protected/:path*", "/api/:path*"],
};
