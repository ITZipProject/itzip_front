import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/common/footer';
import HeaderBar from '@/components/common/header-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | title',
    default: 'description',
  },
  description: 'description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-black  mx-auto`}>
        <HeaderBar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
