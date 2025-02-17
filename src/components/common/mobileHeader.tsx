'use client';

import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/store/useTokenStore';
import { useModal } from '@/lib/context/ModalContext';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/mypage/useUser';

import ProfileDropdownMenu from './dropdownMenu/profileDropdownMenu';
import NavigationDropdownMenu from './dropdownMenu/navigationDropdownMenu';
const menus = [
  {
    name: '이력서',
    to: '/resume',
  },
  {
    name: '채용공고',
    to: '/recruit',
  },
  {
    name: '기술정보',
    to: '/blog',
  },
  {
    name: '학습하기',
    to: '/study',
  },
];

export default function MobileHeader({}) {
  const { openModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [token] = useAtom(tokenAtom);
  const { user, isLoading } = useUser();

  const isLoggedIn = !!token.accessToken;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mobileHeader">
      <nav className=" h-[70px] w-full flex px-10 items-center justify-between fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-200">
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
