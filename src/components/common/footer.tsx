import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-40 w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Image src="/logo.svg" alt="Logo" width={102} height={30} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-400 md:text-3xl">010-0000-0000</p>
            <p className="text-lg text-gray-400 md:text-xl">example123456@gmail.com</p>
          </div>
        </div>

        <div className="py-6 text-sm leading-relaxed text-gray-400">
          <p>
            ㈜**** | 대표이사 : 짱구 | 서울특별시 강남구 *** 한국 3층 ㈜****
            <br />
            사업자등록번호 : --**** | 통신판매업신고 : 제****-서울강남-***** 호<br />
            직업정보제공사업 신고번호 : J************
            <br />
            제호 : Enterprise | 대표·발행인 : *** | 편집인 : *** | 청소년보호책임자 : ***
            <br />
            인터넷신문등록번호 : 서울,아***** 등록일 : ****년 **월 **일 | 발행일 : ****년 **월 **일
          </p>
        </div>

        <div className="flex flex-wrap gap-5 border-t border-gray-200 py-6 md:gap-10">
          <Link href="/privacy" className="text-sm font-semibold text-gray-600">
            개인정보처리방침
          </Link>
          <Link href="/policy" className="text-sm font-semibold text-gray-600">
            운영정책
          </Link>
          <Link href="/terms" className="text-sm font-semibold text-gray-600">
            이용약관
          </Link>
          <Link href="/youth-policy" className="text-sm font-semibold text-gray-600">
            청소년보호정책
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-400">Copyright © 2024 non-names</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
