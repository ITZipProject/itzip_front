'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/lib/context/ModalContext';
import LoginModal from '../../app/components/auth/login/loginModal';
import EmailLoginModal from '../../app/components/auth/email/emailLoginModal';
import SignUpModal from '../../app/components/auth/signup/signUpModal';
import SignUpEmailModal from '../../app/components/auth/signup/signupEmailModal';
import { Modals } from './Modals';

interface HeaderBarProps {
  exists?: boolean;
  profileImage?: string | undefined;
}

export default function HeaderBar({ profileImage, exists }: HeaderBarProps) {
  const pathname = usePathname();
  const { openModal } = useModal();

  const isStudyPage = pathname.startsWith('/study');
  const headerBackgroundColor = isStudyPage ? 'bg-neutral-900' : 'bg-white';
  const textColor = isStudyPage ? 'text-gray-200' : 'text-headerText';

  return (
    <div
      className={`h-[70px] ${headerBackgroundColor} flex justify-between w-screen px-10 items-center`}
    >
      <Link className={`text-logo font-extrabold text-logoSize ${textColor}`} href={'/'}>
        ITZIP
      </Link>
      <div className={`flex gap-[56px] ${textColor} text-headerSize`}>
        {!exists ? (
          <button onClick={() => openModal('LoginModal')}>이력서</button>
        ) : (
          <Link href={'/resume'}>이력서</Link>
        )}
        <Link href={'/recruit'}>
          <span>채용공고</span>
        </Link>
        <Link href={'/blog'}>기술정보</Link>
        {!exists ? (
          <button onClick={() => openModal('LoginModal')}>학습하기</button>
        ) : (
          <Link href={'/study'}>학습하기</Link>
        )}
      </div>
      <div className={`gap-[24px] ${textColor} items-center flex`}>
        <div>
          {!exists ? (
            <button
              onClick={() => openModal('LoginModal')}
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
        <Link href={''}>고객센터</Link>
      </div>
      <Modals />
    </div>
  );
}
