import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { NextResponse } from "next/server";

import { urlFromServer } from "@/server/middleware";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES = [
  "/auth",
  "/register",
  "/auth-error",
];
const PROTECTED_ROUTES = ["/dashboard", "/dashboard/settings"];
const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  const slugRoute = req.nextUrl.pathname.split("/").pop();

  // ⚙️ Is Api Route:
  if (isApiAuthRoute) {
    return;
  }

  // ⚙️ Is Auth Route. First, check is authenticated:
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl),
      );
    }
    return;
  }

  // ⚙️ Protected routes. If not authenticated, redirect to /auth:
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // ⚙️ Redirect using slug:
  // If not public route and not protected route:
  if (!isPublicRoute && !isProtectedRoute) {
    const getDataApi = await urlFromServer(slugRoute!);

    if (getDataApi.redirect404) {
      console.log("🚧 Error - Redirect 404: ", slugRoute);
    }

    if (getDataApi.error) {
      return NextResponse.json({ error: getDataApi.message }, { status: 500 });
    }

    if (getDataApi.url) {
      return NextResponse.redirect(new URL(getDataApi.url).toString());
    }
  }
  return;
});

export const config = {
  matcher: [
    "/((?!api/|_next/|images/|docs/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/s/:slug*",
  ],
};