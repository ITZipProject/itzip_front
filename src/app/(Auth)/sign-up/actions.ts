"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/app/lib/constants";

import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/app/lib/session";
import db from "@/app/lib/db";

const checkPassword = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const formSchema = z
  .object({
    email: z
      .string()
      .email("사용할 수 없는 이메일입니다.")
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 입니다.`
      )
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    passwordConfirm: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 입니다.`
      ),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "사용할 수 없는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "비밀번호를 다시 확인해주세요.",
    path: ["passwordConfirm"],
  });
export async function signUp(prevState: any, formData: FormData) {
  // formData 가져오기
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // 유저 데이터 db에 저장
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    // 유저 로그인
    const session = await getSession();
    session.id = user.id;
    await session.save();

    // 유저 로그인 시 /로 redirect
    redirect("/");
  }
}
