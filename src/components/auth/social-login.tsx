import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className="w-full mb-4 relative">
        <div className="absolute w-1/3 h-px bg-neutral-500" />
        <span className="absolute -top-3 left-1/2 right-1/2 w-10">또는</span>
        <div className="absolute w-1/3 h-px right-0 bg-neutral-500" />
      </div>
      <div className="flex flex-col w-full gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-2"
          href="/github/start"
        >
          <span>깃허브로 로그인</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-2"
          href="/sms"
        >
          <span>구글로 로그인</span>
        </Link>
      </div>
    </>
  );
}
