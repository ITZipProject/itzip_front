import getSession from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}
const publicOnlyUrls: Routes = {
  "/": true,
  "/sign-in": true,
  "/sign-up": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // 로그인 아닌 경우 header navigation bar에 sign up/in이 보여짐
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  } else {
    // 로그인 한 경우 header navigation bar에 profile이 보여짐
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
