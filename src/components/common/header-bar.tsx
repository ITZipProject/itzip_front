'use client';
import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderBarProps {
    exists?: boolean;
    profileImage?: string | undefined;
}

export default function HeaderBar({ profileImage, exists }: HeaderBarProps) {
    const pathname = usePathname();
    return (
        <div className="h-[70px] border border-white bg-white flex justify-between w-screen px-10 items-center">
            <Link className="text-logo font-extrabold text-logoSize" href={'/'}>
                ITZIP
            </Link>
            <div className="flex gap-[56px] *:text-headerSize *:text-headerText ">
                <Link href={'/recruit'}>이력서</Link>
                <Link href={'/recruit'}>
                    {pathname === '' ? <span>채용공고</span> : <span>채용공고</span>}
                </Link>
                <Link href={'/blog'}>기술정보</Link>
                <Link href={'/quiz'}>학습하기</Link>
            </div>
            <div className="gap-[24px] items-center flex">
                <Link href={''}>고객센터</Link>
                <Link href={'/profile'}>
                    {!exists ? (
                        <div className="border px-[20px] py-[10px] rounded-[16px] border-opacity-10">
                            로그인
                        </div>
                    ) : (
                        <Image
                            src={profileImage || ''}
                            width={40}
                            height={40}
                            className="rounded-lg size-[40px]"
                            alt={'profileImage'}
                        />
                    )}
                </Link>
            </div>
        </div>
    );
}
