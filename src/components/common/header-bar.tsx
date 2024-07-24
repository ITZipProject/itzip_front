'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/lib/context/ModalContext';
import LoginModal from '../auth/loginModal';
import EmailLoginModal from '../auth/emailLoginModal';

interface HeaderBarProps {
  exists?: boolean;
  profileImage?: string | undefined;
}

export default function HeaderBar({ profileImage, exists }: HeaderBarProps) {
  const pathname = usePathname();
  const { openModal } = useModal();

  return (
    <div className="h-[70px] border border-white bg-white flex justify-between w-screen px-10 items-center">
      <Link className="text-logo font-extrabold text-logoSize" href={'/'}>
        ITZIP
      </Link>
      <div className="flex gap-[56px] text-headerSize text-headerText">
        {!exists ? (
          <button onClick={() => openModal('signupModal')}>이력서</button>
        ) : (
          <Link href={'/resume'}>이력서</Link>
        )}
        <Link href={'/recruit'}>
          {pathname === '' ? <span>채용공고</span> : <span>채용공고</span>}
        </Link>
        <Link href={'/blog'}>기술정보</Link>
        {!exists ? (
          <button onClick={() => openModal('signupModal')}>학습하기</button>
        ) : (
          <Link href={'/algorithm'}>알고리즘</Link>
        )}
      </div>
      <div className="gap-[24px] items-center flex">
        <Link href={''}>고객센터</Link>
        <div>
          {!exists ? (
            <button
              onClick={() => openModal('signupModal')}
              className="border px-[20px] py-[10px] rounded-[16px] border-opacity-10"
            >
              로그인
            </button>
          ) : (
            <Link href={'/profile'}>
              <Image
                src={profileImage || ''}
                width={40}
                height={40}
                className="rounded-lg size-[40px]"
                alt={'profileImage'}
              />
            </Link>
          )}
        </div>
      </div>
      <LoginModal modalId="signupModal" />
      <EmailLoginModal modalId="signinModal" />
    </div>
  );
}
