import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { decodeToken } from "./lib/utils"; // your JWT decode utility
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

// Routes
const protectedRoutes = ["/overview", "/projects", "/tasks"];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.locale || "en";
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const token = request.cookies.get("x-token")?.value;
  const isLoggedIn = Boolean(token);

  // Protected routes
  if (
    protectedRoutes.some((r) => pathWithoutLocale.startsWith(r)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/auth/signin?redirected=1`, request.url)
    );
  }

  // Admin routes
  if (adminRoutes.some((r) => pathWithoutLocale.startsWith(r))) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/signin?redirected=1`, request.url)
      );
    }

    try {
      const user = decodeToken(token);

      if (!user?.permissions?.includes("admin:full")) {
        return NextResponse.redirect(
          new URL(`/${locale}/unauthorized`, request.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL(`/${locale}/auth/signin?error=invalid`, request.url)
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|trpc|_vercel|.*\\..*).*)"],
};
