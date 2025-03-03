'use client';

import { useAtom } from 'jotai';
import { LogOutIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';
import { tokenAtom } from '@/store/useTokenStore';
import defaultProfile from 'public/defaultProfileImage.jpg';
import logo from 'public/logo.png';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { Separator } from '../ui/separator';

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

export default function Navigation({}: object) {
  const { openModal } = useModal();
  const [token] = useAtom(tokenAtom);
  const { user } = useUser();

  const isLoggedIn = !!token.accessToken;
  const [, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="header">
      <nav className=" fixed inset-x-0 top-0 z-50 flex h-[70px] w-full items-center justify-between border-b border-gray-200 bg-background px-20">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" className="w-[100px]" />
          </Link>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  <Link className={navigationMenuTriggerStyle()} href={menu.to}>
                    {menu.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.imageUrl || ''}
                    className="size-[40px] rounded-full border-2"
                  />
                  <AvatarFallback>
                    <Image src={defaultProfile} alt="defaultProfile" className="w-[100px]" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-medium">{user?.nickname}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <UserIcon className="mr-2 size-4" />
                      마이페이지
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="flex w-full cursor-pointer justify-start">
                  <Button variant="ghost" onClick={() => openModal('alertModal')}>
                    <LogOutIcon className="mr-2 size-4" />
                    로그아웃
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" onClick={() => openModal('LoginModal')}>
              <span>로그인</span>
            </Button>
            <Button asChild onClick={() => openModal('signUpModal')}>
              <span>회원가입</span>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
