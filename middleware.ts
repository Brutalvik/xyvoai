import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { decodeToken } from "./lib/utils"; // You need this utility

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes = ["/overview", "/projects", "/tasks"];
const adminRoutes = ["/admin", "/admin/permissions", "/admin/users"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.locale || "en";

  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  const token = request.cookies.get("x-token")?.value;
  const isLoggedIn = Boolean(token);

  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL(
      `/${locale}/auth/signin?redirected=1`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute) {
    if (!token) {
      const redirectUrl = new URL(
        `/${locale}/auth/signin?redirected=1`,
        request.url
      );
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const user = decodeToken(token);
      if (!user?.permissions?.includes("admin:full")) {
        return NextResponse.redirect(
          new URL(`/${locale}/unauthorized`, request.url)
        );
      }
    } catch (err) {
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
