import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import Footer from '@/components/common/footer';
import HeaderBar from '@/components/common/header-bar';
import { ModalProvider } from '@/lib/context/ModalContext';
import db from '../lib/db';
import getSession from '../lib/session';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    template: 'ITZIP | %s ',
    default: 'ITZIP',
  },
  // icons: {
  //   icon: '/favicon.png',
  // },
  description: 'description',
};

async function getUser() {
  const session = await getSession();
  if (session?.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return Boolean(user);
    }
  }
  return false;
}

async function getUserProfile() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user.avatar ?? undefined;
    }
  }
  return undefined;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const profileImage = await getUserProfile();
  return (
    <html lang="ko" className={pretendard.variable}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`mx-auto overflow-x-hidden bg-white text-black ${pretendard.className}`}>
        <ModalProvider>
          <HeaderBar profileImage={profileImage} exists={user} />
          {children}
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
