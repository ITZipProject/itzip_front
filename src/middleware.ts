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

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const isPublicPage = publicOnlyUrls[request.nextUrl.pathname];

  if (!token) {
    // 토큰이 없고 (비로그인 상태)
    if (!isPublicPage) {
      // 퍼블릭 페이지가 아닌 경우 홈으로 리디렉션
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // 토큰이 있는 경우 (로그인 상태)

    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// middleware를 실행시키고 싶은 경로 - 아래는 해당되는 경로는 제외 시킨다.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|public/|logo.svg|quizImage1.png|quizImage2.png|algorithmImage.png|algorithmImage2.png|images/).*)',
  ],
};
