'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';
import { tokenAtom } from '@/store/useTokenStore';
import logo from 'public/logo.png';

import NavigationDropdownMenu from './dropdownMenu/navigationDropdownMenu';
import ProfileDropdownMenu from './dropdownMenu/profileDropdownMenu';
import { Button } from '../ui/button';

// const menus = [
//   {
//     name: '이력서',
//     to: '/resume',
//   },
//   {
//     name: '채용공고',
//     to: '/recruit',
//   },
//   {
//     name: '기술정보',
//     to: '/blog',
//   },
//   {
//     name: '학습하기',
//     to: '/study',
//   },
// ];

export default function MobileHeader({}) {
  const { openModal } = useModal();
  const [, setMounted] = useState(false);
  const [token] = useAtom(tokenAtom);
  const { user } = useUser();

  const isLoggedIn = !!token.accessToken;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mobileHeader">
      <nav className=" fixed inset-x-0 top-0 z-50 flex h-[70px] w-full items-center justify-between border-b border-gray-200 bg-background px-10">
        <NavigationDropdownMenu />
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" className="w-[100px]" />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <ProfileDropdownMenu user={user} />
          </div>
        ) : (
          <div>
            <Button asChild variant="outline" onClick={() => openModal('LoginModal')}>
              <span>로그인</span>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
