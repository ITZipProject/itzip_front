'use client';

import { Separator } from '../ui/separator';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { LogOutIcon, UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/store/useTokenStore';
import { useModal } from '@/lib/context/ModalContext';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/mypage/useUser';
import defaultProfile from 'public/defaultProfileImage.jpg';

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

export default function Navigation({}: {}) {
  const { openModal } = useModal();
  const [token] = useAtom(tokenAtom);
  const { user } = useUser();

  const isLoggedIn = !!token.accessToken;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="header">
      <nav className=" h-[70px] w-full flex px-20 items-center justify-between fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-200">
        <div className="flex items-center">
          <Link href={'/'}>
            <Image src={logo} alt="logo" className="w-[100px]" />
          </Link>
          <Separator orientation="vertical" className="h-6 mx-4" />
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
                    className="border-2 rounded-full size-[40px]"
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
                      <UserIcon className="size-4 mr-2" />
                      마이페이지
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer w-full flex justify-start">
                  <Button variant="ghost" onClick={() => openModal('alertModal')}>
                    <LogOutIcon className="size-4 mr-2" />
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
