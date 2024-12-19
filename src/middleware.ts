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
    isAuthenticated: !!accessToken,
  };
};

export function middleware(request: NextRequest) {
  const { isAuthenticated } = checkAuth(request);
  const isPublicPage = publicOnlyUrls[request.nextUrl.pathname];

  // 비인증 상태에서 보호된 페이지 접근 시도
  if (!isAuthenticated && !isPublicPage) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 인증 상태에서 로그인/회원가입 페이지 접근 시도
  if (isAuthenticated && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons/|public/|logo.svg|images/).*)'],
};
