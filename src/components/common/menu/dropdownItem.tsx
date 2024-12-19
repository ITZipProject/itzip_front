'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { useModal } from '@/lib/context/ModalContext';
import { tokenAtom } from '@/store/useTokenStore';

const DropdownItem = () => {
  const { openModal } = useModal();
  const [token] = useAtom(tokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token.accessToken);
  }, [token.accessToken]);

  return (
    <>
      <div className={`text-headerSize flex flex-col gap-spacing-05`}>
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
      <div className="my-2 h-px w-full bg-Grey-200" />
      <div className={`flex items-center gap-spacing-07`}>
        <div>
          {!isLoggedIn ? (
            <button onClick={() => openModal('LoginModal')}>로그인</button>
          ) : (
            <Link href="/profile">
              <button className="">마이페이지</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default DropdownItem;
