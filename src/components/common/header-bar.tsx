'use client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeaderBar() {
  const pathname = usePathname();

  return (
    <div className="h-10 bg-main flex justify-between w-screen px-10 items-center">
      <Link href={'/'}>logo</Link>
      <div className="flex gap-6">
        <Link href={'/asd'}>이력서</Link>
        <Link href={'/#'}>
          {pathname === '' ? <span>채용공고</span> : <span>채용공고</span>}
        </Link>
        <Link href={'/#'}>기술정보</Link>
        <Link href={'/#'}>학습하기</Link>
      </div>

      {/* session */}
      {true ? (
        <div>
          <Link href={'/profile'}>
            {' '}
            {pathname === '/profile' ? (
              <span className="text-red-500">MyProfile</span>
            ) : (
              <span>MyProfile</span>
            )}
          </Link>
        </div>
      ) : (
        <Link href={'/sign-in'}>로그인</Link>
      )}
    </div>
  );
}
