'use client';

import { useAtom } from 'jotai';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useModal } from '@/lib/context/ModalContext';
import logo from 'public/logo.png';
import { tokenAtom } from '@/store/useTokenStore';

export default function HeaderBar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [token] = useAtom(tokenAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isStudyPage = pathname.startsWith('/study');
  const headerBackgroundColor = isStudyPage ? 'bg-stone-800' : 'bg-white';
  const textColor = isStudyPage ? 'text-gray-200' : 'text-headerText';

  if (!mounted) {
    return (
      <div className="header">
        <div
          className={`flex h-[70px] w-full items-center justify-between border border-b-2 px-10 ${headerBackgroundColor} *:[516px]:text-8 *:text-14  *:xl:text-16`}
        >
          <Link className={`text-logoSize font-extrabold ${textColor} text-logo`} href={'/'}>
            <Image src={logo} alt="logo" className="w-[100px]" />
          </Link>
          <div className={`flex gap-spacing-05 ${textColor} text-headerSize`}>
            <Link href={'#'}>이력서</Link>
            <Link href={'/recruit'}>채용공고</Link>
            <Link href={'#'}>기술정보</Link>
            <Link href={'#'}>학습하기</Link>
          </div>
          <div className={`gap-spacing-07 ${textColor} flex items-center`}>
            <div>
              <button className="border/10 rounded-radius-04 border px-spacing-06 py-[10px]">
                로그인
              </button>
            </div>
            <Link href={'/customer-service'}>고객센터</Link>
          </div>
        </div>
      </div>
    );
  }

  const isLoggedIn = !!token.accessToken;

  return (
    <div className="header">
      <div
        className={`flex h-[70px] w-full items-center justify-between px-10 
          ${pathname?.includes('study') ? 'bg-stone-800' : 'bg-white'}
          ${pathname?.includes('study') ? '' : 'border border-b-2'}
          *:[516px]:text-8 *:text-14  *:xl:text-16`}
      >
        <Link
          className={`text-logoSize font-extrabold ${pathname?.includes('study') ? 'text-gray-200' : 'text-headerText'} text-logo`}
          href={'/'}
        >
          <Image src={logo} alt="logo" className="w-[100px]" />
        </Link>
        <div
          className={`flex gap-spacing-05 ${pathname?.includes('study') ? 'text-gray-200' : 'text-headerText'} text-headerSize`}
        >
          <Link
            href={isLoggedIn ? '/resume' : '#'}
            onClick={!isLoggedIn ? () => openModal('LoginModal') : undefined}
          >
            이력서
          </Link>
          <Link href={'/recruit'}>
            <span>채용공고</span>
          </Link>
          <Link
            href={isLoggedIn ? '/blog' : '#'}
            onClick={!isLoggedIn ? () => openModal('LoginModal') : undefined}
          >
            기술정보
          </Link>
          <Link
            href={isLoggedIn ? '/study' : '#'}
            onClick={!isLoggedIn ? () => openModal('LoginModal') : undefined}
          >
            학습하기
          </Link>
        </div>
        <div
          className={`gap-spacing-07 ${pathname?.includes('study') ? 'text-gray-200' : 'text-headerText'} flex items-center`}
        >
          <div>
            {!isLoggedIn ? (
              <button
                onClick={() => openModal('LoginModal')}
                className="border/10 rounded-radius-04 border px-spacing-06 py-[10px]"
              >
                로그인
              </button>
            ) : (
              <Link href="/profile">
                <button className="border/10 rounded-radius-04 border px-spacing-06 py-[10px]">
                  마이페이지
                </button>
              </Link>
            )}
          </div>
          <Link href={'/customer-service'}>고객센터</Link>
        </div>
      </div>
    </div>
  );
}
