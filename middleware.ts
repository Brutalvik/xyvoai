import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Create the intl middleware from next-intl
const intlMiddleware = createIntlMiddleware(routing);

// Define routes to protect (NO locale prefix)
const protectedRoutes = ["/dashboard", "/projects", "/tasks"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.locale || "en";

  // Remove locale prefix from pathname (e.g., /en/dashboard -> /dashboard)
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  // Match if this is a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  const isLoggedIn = Boolean(request.cookies.get("x-token")?.value);

  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL(
      `/${locale}/auth/signin?redirected=1`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Run the locale middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|trpc|_vercel|.*\\..*).*)"],
};
