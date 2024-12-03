'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';

import { loadingAtom } from '@/atoms/formAtoms';
import useUser from '@/hooks/mypage/useUser';
import { accessTokenAtom } from '@/store/useTokenStore';
import profile from '../../../public/profile.png';
import { useState } from 'react';

export default function MyPageContainer() {
  const [accessToken] = useAtom(accessTokenAtom);
  const { user, userLogout } = useUser(accessToken ?? '');
  const [loading] = useAtom(loadingAtom);
  const [isEdit, setIsEdit] = useState({
    myProfile: false,
    default: false,
  });
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [password, setPassword] = useState('');

  const onStartEdit = (type: 'myProfile' | 'default') => {
    setIsEdit((prev) => ({ ...prev, [type]: true }));
  };
  const onFinishEdit = () => {
    // 프로필 이미지, 닉네임 수정
  };
  const onCancelEdit = (type: 'myProfile' | 'default') => {
    setIsEdit((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <div className=" flex h-screen w-screen flex-col bg-[#F9FBFC] p-4 space-y-4">
      <section className="w-full max-w-[900px] mx-auto shadow-md border-2 py-[20px] px-[30px] rounded-2xl space-y-8">
        <h2 className="font-bold text-[20px]">내 프로필</h2>
        <div className="space-y-4">
          <div className="flex flex-row space-x-4  ">
            <h2 className="min-w-[85px]">이미지</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row space-x-4">
                <div className="flex w-[100px] h-[100px] gap-4 border-2 border-Blue-200 p-[10px] rounded-xl bg-white justify-center items-center">
                  {user?.imageUrl ? (
                    <Image src={user.imageUrl} alt="profileImage" />
                  ) : (
                    <Image src={profile} alt="emptyImage" className="object-contain" />
                  )}
                </div>
                <label
                  className="cursor-pointer border border-Grey-200 py-[10px] px-[20px] rounded-xl h-[40px]"
                  htmlFor="profile"
                >
                  변경
                </label>
                <input type="file" id="profile" hidden />
              </div>
            ) : (
              <>
                {' '}
                <div className="flex w-[200px] h-[200px] gap-4 border-2 border-Blue-200 p-[10px] rounded-xl bg-white justify-center items-center">
                  {user?.imageUrl ? (
                    <Image src={user.imageUrl} alt="profileImage" />
                  ) : (
                    <Image src={profile} alt="emptyImage" className="object-contain" />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row space-x-4 max-w-[500px] items-center ">
            <h2 className="min-w-[85px]">닉네임</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row gap-4 items-center">
                <input
                  name="nickname"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  placeholder={user?.nickname}
                  className="border-Grey-200"
                />
                <button className="border border-Grey-200 py-[10px] px-[20px] rounded-xl text-[12px]">
                  중복 확인
                </button>
              </div>
            ) : (
              <span>{user?.nickname}</span>
            )}
          </div>
          <div className="flex flex-row space-x-4 max-w-[500px] justify-between items-center">
            <div className="flex flex-row">
              <h2 className="min-w-[100px]">계정</h2>
              <span>{user?.email}</span>
            </div>
            {isEdit.myProfile ? (
              <div className="space-x-4">
                <button onClick={() => onCancelEdit('myProfile')}>취소</button>
                <button
                  onClick={onFinishEdit}
                  className="border border-Grey-200 py-[10px] px-[20px] rounded-xl"
                >
                  저장
                </button>
              </div>
            ) : (
              <button
                onClick={() => onStartEdit('myProfile')}
                className="border border-Grey-200 py-[10px] px-[20px] rounded-xl"
              >
                설정
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="w-full max-w-[900px] mx-auto shadow-md border-2 py-[20px] px-[30px] rounded-2xl space-y-4">
        <h2 className="font-bold text-[20px]">기본 정보</h2>
        <div className="space-y-4">
          <div className="flex flex-row space-x-4 max-w-[500px] justify-between items-center">
            <div className="flex flex-row items-center">
              <h2 className="min-w-[100px]">비밀번호</h2>
              {isEdit.default ? (
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요."
                  className="border-Grey-200 text-[14px]"
                />
              ) : (
                <div className="text-Grey-400">비밀번호 설정</div>
              )}
            </div>
            {isEdit.default ? (
              <div className="space-x-4">
                <button onClick={() => onCancelEdit('default')}>취소</button>
                <button
                  onClick={onFinishEdit}
                  className="border border-Grey-200 py-[10px] px-[20px] rounded-xl"
                >
                  저장
                </button>
              </div>
            ) : (
              <button
                onClick={() => onStartEdit('default')}
                className="border border-Grey-200 py-[10px] px-[20px] rounded-xl"
              >
                설정
              </button>
            )}
          </div>
        </div>
      </section>
      <button className="self-end">{'계정 탈퇴 >'}</button>
    </div>
  );
}
