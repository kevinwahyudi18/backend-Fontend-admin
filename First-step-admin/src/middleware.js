import { NextResponse } from "next/server";
import cookie from 'js-cookie';

export function middleware(request) {
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.includes(request.nextUrl.pathname);
  const adminAccessToken = request.cookies.get("adminAccessToken");
  // const adminAccessToken = cookie.get('adminAccessToken');
  const redirect =
    (isAuthPath && adminAccessToken) || (!isAuthPath && !adminAccessToken);

  return redirect
    ? NextResponse.redirect(new URL(isAuthPath ? "/" : "/login", request.url))
    : NextResponse.next();
}

// determines which path the middleware will implement
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/logout",
  ],
};
