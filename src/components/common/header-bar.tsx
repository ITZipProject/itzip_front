'use client';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderBarProps {
  exists?: boolean;
}

export default function HeaderBar({ exists }: HeaderBarProps) {
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
      <Link href={!exists ? '/sign-up' : '/profile'}>
        {!exists ? '회원가입' : '마이프로필'}
      </Link>
    </div>
  );
}
