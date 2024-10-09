import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import Footer from '@/components/common/footer';
import HeaderBar from '@/components/common/header-bar';
import { ModalProvider } from '@/lib/context/ModalContext';

import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

interface PageProps {
  childPropSegment?: string;
  [key: string]: unknown;
}

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

function isEditorPage(child: ReactNode): boolean {
  if (
    typeof child === 'object' &&
    child !== null &&
    'props' in child &&
    typeof child.props === 'object' &&
    child.props !== null
  ) {
    const props = child.props as PageProps;
    return props.childPropSegment === 'editor';
  }
  return false;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const shouldHideHeaderAndFooter = isEditorPage(children);

  return (
    <html lang="ko" className={pretendard.variable}>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`mx-auto overflow-x-hidden bg-white text-black ${pretendard.className}`}>
        <ModalProvider>
          {!shouldHideHeaderAndFooter && <HeaderBar />}
          <main className={shouldHideHeaderAndFooter ? 'mt-[58px]' : ''}>{children}</main>
          {!shouldHideHeaderAndFooter && <Footer />}
        </ModalProvider>
      </body>
    </html>
  );
}
