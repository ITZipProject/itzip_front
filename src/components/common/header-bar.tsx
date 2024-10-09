'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/lib/context/ModalContext';
import { Modals } from './Modals';
import { useState, useEffect } from 'react';

export default function HeaderBar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const isStudyPage = pathname.startsWith('/study');
  const headerBackgroundColor = isStudyPage ? 'bg-stone-800' : 'bg-white';
  const textColor = isStudyPage ? 'text-gray-200' : 'text-headerText';

  return (
    <div
      className={`h-[70px] ${headerBackgroundColor} flex justify-between w-screen px-10 items-center`}
    >
      <Link className={`text-logo font-extrabold text-logoSize ${textColor}`} href={'/'}>
        ITZIP
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
        <Link href={'/blog'}>기술정보</Link>
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
      <Modals />
    </div>
  );
}
