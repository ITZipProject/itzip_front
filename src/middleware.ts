import { NextRequest, NextResponse } from 'next/server';

interface Routes {
  [key: string]: boolean;
}

// 로그인이 필요하지 않는 페이지
const publicOnlyUrls: Routes = {
  '/': true,
  '/recruit': true,
  '/policy/terms': true,
  '/policy/privacy': true,
};

// 토큰 체크 함수
const checkAuth = (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  return {
    accessToken,
    refreshToken,
    isLoggedIn: !!accessToken || !!refreshToken,
  };
};

export function middleware(request: NextRequest) {
  const { isLoggedIn } = checkAuth(request);
  const pathname = request.nextUrl.pathname;
  const isPublicPage = publicOnlyUrls[pathname];

  // 비로그인 상태에서 보호된 페이지 접근 시도
  if (!isLoggedIn && !isPublicPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons/|public/|logo.svg|images/).*)'],
};
