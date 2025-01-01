'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/common/Button/Button';
import Section from '@/components/mypage/Section';
import Title from '@/components/mypage/Title';
import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';
import { tokenAtom } from '@/store/useTokenStore';

import profile from '../../../public/profile.png';

export default function MyPageContainer() {
  const { user, checkUserNickname, updateNickname, updatePassword } = useUser();
  const [isEdit, setIsEdit] = useState({
    myProfile: false,
    default: false,
  });
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isOk, setIsOk] = useState({
    nicknameOk: false,
    passwordOk: false,
  });
  const [, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onStartEdit = (type: 'myProfile' | 'default') => {
    setIsEdit((prev) => ({ ...prev, [type]: true }));
  };

  const onCancelEdit = (type: 'myProfile' | 'default') => {
    setIsEdit((prev) => ({ ...prev, [type]: false }));
    setNickname('');
    setPassword('');
    setProfileImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  const nicknameCheck = async () => {
    if (!nickname) return;
    const isValid = await checkUserNickname(nickname);
    setIsOk((prev) => ({ ...prev, nicknameOk: isValid }));
  };

  const handleNicknameCheck = () => {
    void nicknameCheck();
  };

  const savedProfile = async () => {
    try {
      if (nickname && nickname !== user?.nickname && isOk.nicknameOk) {
        const success = await updateNickname(nickname);
        if (success) {
          setIsEdit((prev) => ({ ...prev, myProfile: false }));
          window.location.reload();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('프로필 저장에 실패했습니다');
    }
  };

  const onFinishEdit = async (type: 'myProfile' | 'default') => {
    if (type === 'myProfile') {
      await savedProfile();
    } else {
      if (password) {
        const success = await updatePassword(password);
        if (success) {
          setIsEdit((prev) => ({ ...prev, default: false }));
          setPassword('');
        }
      }
    }
  };

  const handleFinishEdit = (type: 'myProfile' | 'default') => {
    void onFinishEdit(type);
  };

  return (
    <div className="flex w-screen flex-col space-y-4 bg-[#F9FBFC] p-4 px-spacing-06 *:bg-white">
      <Section>
        <Title title="내 프로필" />
        <div className="space-y-4">
          <div className="flex flex-row space-x-4 ">
            <h2 className="min-w-[85px]">이미지</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row space-x-4">
                <div className="flex size-[100px] items-center justify-center gap-4 rounded-xl border-2 border-Blue-200 bg-white p-[10px]">
                  {previewUrl || user?.imageUrl ? (
                    <Image
                      src={previewUrl || user?.imageUrl || '/profile.png'}
                      alt="profileImage"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={profile}
                      alt="emptyImage"
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  )}
                </div>
                <label
                  className="h-spacing-11 cursor-pointer rounded-xl border border-Grey-200 px-spacing-06 py-[10px]"
                  htmlFor="profile"
                >
                  변경
                </label>
                <input
                  name="profile"
                  type="file"
                  id="profile"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div className="flex size-spacing-19 items-center justify-center gap-4 rounded-xl border-2 border-Blue-200 bg-white p-[10px]">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="profileImage"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={profile}
                    alt="emptyImage"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex flex-row items-center space-x-4 ">
            <h2 className="min-w-[85px]">닉네임</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row items-center gap-4">
                <input
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={user?.nickname}
                  className="border-Grey-200"
                />

                <Button onClick={handleNicknameCheck} variant="nonBorderButton">
                  중복 확인
                </Button>
              </div>
            ) : (
              <span>{user?.nickname}</span>
            )}
          </div>

          <div className="flex flex-row items-center  justify-between space-x-4 ">
            <div className="flex flex-row ">
              <h2 className="min-w-[100px]">계정</h2>
              <span>{user?.email}</span>
            </div>
            {isEdit.myProfile ? (
              <div className="space-x-4">
                <Button onClick={() => onCancelEdit('myProfile')} variant="none">
                  취소
                </Button>
                <Button onClick={() => handleFinishEdit('myProfile')} variant="nonBorderButton">
                  저장
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => onStartEdit('myProfile')}
                  variant="nonBorderButton"
                  loadingText=""
                >
                  설정
                </Button>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <Title title="기본 정보" />
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between space-x-4">
            <div className="flex flex-row items-center">
              <h2 className="min-w-[100px]">비밀번호</h2>
              {isEdit.default ? (
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="border-Grey-200 text-14"
                />
              ) : (
                <div className="text-Grey-400">비밀번호 설정</div>
              )}
            </div>
            {isEdit.default ? (
              <div className="space-x-4">
                <Button variant="none" onClick={() => onCancelEdit('default')}>
                  취소
                </Button>
                <Button variant="nonBorderButton" onClick={() => handleFinishEdit('default')}>
                  저장
                </Button>
              </div>
            ) : (
              <Button variant="nonBorderButton" onClick={() => onStartEdit('default')}>
                설정
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="nonBorderButton"
          onClick={() => openModal('alertModal')}
          classNames="w-full"
        >
          {'로그아웃'}
        </Button>
      </Section>
    </div>
  );
}
