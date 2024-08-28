import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

// 로그인이 필요하지 않는 페이지
const publicOnlyUrls: Routes = {
  '/': true,
  '/sign-in': true,
  '/sign-up': true,
};
// 세션이 유효한지
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    // 비로그인 상태에서 퍼블릭 페이지가 아닌 경우 로그인 페이지로 리디렉션
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // 로그인 상태에서 퍼블릭 페이지를 요청하는 경우 홈 페이지로 리디렉션
    if (exists && request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// middleware를 실행시키고 싶은 경로 - 아래는 해당되는 경로는 제외 시킨다.
export const config = {
  matcher: ['/((?!_next/static|_next).*)'],
};
