import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/common/footer';
import HeaderBar from '@/components/common/header-bar';
import { Modals } from '@/components/common/Modals';
import { ModalProvider } from '@/lib/context/ModalContext';
import './globals.css';
// eslint-disable-next-line import/order
import MobileHeader from '@/components/common/mobileHeader';
// eslint-disable-next-line import/order
import { Toaster } from 'react-hot-toast';
import TokenSync from '@/store/tokenSync';
import Navigation from '@/components/common/navigation';

// pretendard 함수 관련 에러로 500이 떠서 일단 주석 처리
interface RootLayoutProps {
  children: ReactNode;
}

interface PageProps {
  childPropSegment?: string;
  [key: string]: unknown;
}

// const pretendard = localFont({
//   src: '../fonts/PretendardVariable.woff2',
//   display: 'swap',
//   weight: '45 920',
//   variable: '--font-pretendard',
// });

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

export default function RootLayout({ children }: RootLayoutProps) {
  const shouldHideHeaderAndFooter = isEditorPage(children);

  return (
    <html lang="ko" className={''}>
      {/* pretendard.variable */}
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`mx-auto overflow-x-hidden bg-white text-black ${''}`}>
        <TokenSync />
        {/* pretendard.className */}
        <ModalProvider>
          {!shouldHideHeaderAndFooter && (
            <>
              <MobileHeader />
              <Navigation />
            </>
          )}
          {/* {!shouldHideHeaderAndFooter && <SmallHeader />} */}

          <main className={shouldHideHeaderAndFooter ? 'mt-[58px]' : 'mt-[70px]'}>{children}</main>
          {!shouldHideHeaderAndFooter && <Footer />}
          <Modals />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ModalProvider>
      </body>
    </html>
  );
}
