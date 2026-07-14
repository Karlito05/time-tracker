import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/timer"];

export default async function proxy(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}
