// import { NextResponse } from "next/server";
// import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log(request.url);
  // console.log(request.cookies.get("jwt_token").value);
  //   return NextResponse.redirect(new URL("/home", request.url));
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
