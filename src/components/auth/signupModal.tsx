import { useState } from 'react';
import Modal from './commonModal';
import Input from '../common/input';
import Button from '../common/button';
import Link from 'next/link';
import Image from 'next/image';
import googleIcon from '../../../public/Google.png';
import githubIcon from '../../../public/github.png';

interface ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

const SignUpModal: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="로그인해볼까요?">
            <div className="w-full px-[60px] space-y-2 *:w-[334px] *:h-[48px] *:justify-center *:items-center *:flex *:font-[400] text-[14px] *:rounded-[16px]">
                <Link href={''} className="bg-black text-white">
                    이메일 로그인
                </Link>
                <h1 className="font-[400] text-[12px] text-[#818181]">또는</h1>
                <Link href={''} className="bg-[#E4E4E4] gap-[10px]">
                    <Image src={googleIcon} width={24} height={24} alt="googleIcon" />
                    Google로 로그인
                </Link>
                <Link href={''} className="bg-[#454545] text-white gap-[10px]">
                    <Image src={githubIcon} width={24} height={24} alt="githubIcon" />
                    Github로 로그인
                </Link>
                <div className="flex flex-col items-center">
                    <h1 className="my-[16px] underline font-[400] text-[13px] underline-offset-4">
                        아직 계정이 없으신가요?
                    </h1>
                </div>
            </div>
        </Modal>
    );
};
export default SignUpModal;
