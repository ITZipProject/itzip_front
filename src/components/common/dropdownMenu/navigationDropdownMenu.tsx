'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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

const NavigationDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-4">
        {menus.map((menu) => (
          <DropdownMenuItem key={menu.name} className="cursor-pointer mb-2">
            <Link href={menu.to} className="font-semibold text-lg">
              {menu.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavigationDropdownMenu;
