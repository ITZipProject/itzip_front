import db from '@/lib/db';
import getSession from '@/lib/session';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { PhotoIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
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
      {user.avatar !== null ? (
        <Image
          src={user.avatar}
          width={400}
          height={400}
          className="size-40  flex flex-col text-neutral-300 border-neutral-300 rounded-full  bg-center bg-cover"
          alt={user.nickname}
        />
      ) : (
        <div className="border-2 size-40 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-full border-dashed cursor-pointer bg-center bg-cover" />
      )}
      <Link href={'/edit-profile'}>계정 관리</Link>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
