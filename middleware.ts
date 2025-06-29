import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);
const protectedRoutes = ["/dashboard", "/projects", "/tasks"];

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const xToken = req.cookies.get("x-token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(`/${req.nextUrl.locale}${route}`)
  );

  if (isProtected && !xToken) {
    const redirectUrl = new URL(
      `/${req.nextUrl.locale}/auth/signin?redirected=1`,
      req.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
