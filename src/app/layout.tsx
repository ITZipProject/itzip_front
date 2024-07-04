import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import HeaderBar from "@/components/common/header-bar";
import getSession from "./lib/session";
import db from "./lib/db";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | title",
    default: "description",
  },
  description: "description",
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white text-black  mx-auto`}>
        <HeaderBar exists={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
