import db from '@/lib/db';
import getSession from '@/lib/session';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <div>
      <div className="flex flex-col">
        <span>{user.nickname}</span>
        <span>{user.email}</span>
      </div>
      {/* <Image src={user.avatar} /> */}
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
