import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/common/footer';
import HeaderBar from '@/components/common/header-bar';
import getSession from '../lib/session';
import db from '../lib/db';
import { ModalProvider } from '@/lib/context/ModalContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | title',
        default: 'description',
    },
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
        <html lang="ko">
            <body className={`${inter.className} bg-white text-black mx-auto`}>
                <ModalProvider>
                    <HeaderBar profileImage={profileImage} exists={user} />
                    {children}
                    <Footer />
                </ModalProvider>
            </body>
        </html>
    );
}
