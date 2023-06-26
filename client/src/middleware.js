import { NextResponse } from "next/server";
export function middleware(request) {
  const isLoggedIn = request.cookies.get("jwt_token")?.value ? true : false;
  const url = request.nextUrl.clone();
  if (isLoggedIn) {
    if (
      request.nextUrl.pathname === "/signin" ||
      request.nextUrl.pathname === "/signup"
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    const pathname = request.nextUrl.pathname;
    if (pathname !== "/signin" && pathname !== "/signup" && pathname !== "/") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file)
     */
    "/((?!api|_next/static|_next/image|static/images|manifest.json|favicon.ico).*)",
  ],
};
