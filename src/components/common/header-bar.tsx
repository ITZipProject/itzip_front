'use client';

import { useAtom } from 'jotai';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useModal } from '@/lib/context/ModalContext';
import { accessTokenAtom } from '@/store/useTokenStore';
import logo from 'public/logo.svg';

export default function HeaderBar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [accessToken] = useAtom(accessTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  const isStudyPage = pathname.startsWith('/study');
  const headerBackgroundColor = isStudyPage ? 'bg-stone-800' : 'bg-white';
  const textColor = isStudyPage ? 'text-gray-200' : 'text-headerText';

  return (
    <div
      className={`flex h-[70px] w-full items-center justify-between border border-b-2 px-10 ${headerBackgroundColor} *:text-8 *:[516px]:text-8 *:md:text-14 *:xl:text-16`}
    >
      <Link className={`font-extrabold text-logoSize ${textColor} text-logo`} href={'/'}>
        <Image src={logo as StaticImageData} alt="logo" className="size-20" />
      </Link>
      <div className={`flex gap-[56px] ${textColor} text-headerSize`}>
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
      <div className={`gap-[24px] ${textColor} items-center flex`}>
        <div>
          {!isLoggedIn ? (
            <button
              onClick={() => openModal('LoginModal')}
              className="border px-[20px] py-[10px] rounded-[16px] border-opacity-10"
            >
              로그인
            </button>
          ) : (
            <Link href="/profile">
              <button className="border px-[20px] py-[10px] rounded-[16px] border-opacity-10">
                마이페이지
              </button>
            </Link>
          )}
        </div>

        <Link href={'/customer-service'}>고객센터</Link>
      </div>
    </div>
  );
}
