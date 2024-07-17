'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';
import db from '@/lib/db';

const profileSchema = z
  .object({
    photo: z.string().optional(),
    nickname: z.string(),
  })
  .superRefine(async ({ nickname }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        nickname,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이름입니다.',
        path: ['nickname'],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function editProfile(_: any, formData: FormData) {
  const data: { photo?: string; nickname: string } = {
    nickname: formData.get('nickname') as string,
  };

  const photo = formData.get('photo') as File | null;

  if (photo) {
    const photoData = await photo.arrayBuffer();
    const photoPath = `./public/${photo.name}`;
    await fs.writeFile(photoPath, Buffer.from(photoData));
    data.photo = `/${photo.name}`;
  }

  const result = await profileSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const updateUser = await db.user.update({
      where: { id: session.id },
      data: {
        avatar: result.data.photo,
        nickname: result.data.nickname,
      },
      select: {
        id: true,
      },
    });
    console.log(updateUser);
    redirect('/profile');
  }
}
