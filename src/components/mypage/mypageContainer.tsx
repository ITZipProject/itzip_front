'use client';

import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import Section from '@/components/mypage/Section';
import Title from '@/components/mypage/Title';
import { useProfileForm } from '@/hooks/mypage/useProfileForm';
import useUser from '@/hooks/mypage/useUser';
import { useModal } from '@/lib/context/ModalContext';

import profile from '../../../public/profile.png';
import { FiRefreshCw } from 'react-icons/fi';

export default function MyPageContainer() {
  const {
    formValues,
    handleInputChange,
    handleNicknameCheck,
    savedProfile,
    savedPassword,
    onCancelEdit,
    uploadImage,
    handleImageChange,
    previewUrl,
  } = useProfileForm();

  const { user, isLoading } = useUser();
  const [isEdit, setIsEdit] = useState({
    myProfile: false,
    default: false,
  });
  const { openModal } = useModal();

  const onStartEdit = (type: 'myProfile' | 'default') => {
    setIsEdit((prev) => ({ ...prev, [type]: true }));
  };

  const onCancelEditHandler = (type: 'myProfile' | 'default') => {
    onCancelEdit();
    setIsEdit((prev) => ({ ...prev, [type]: false }));
  };

  const onFinishEdit = async (type: 'myProfile' | 'default') => {
    if (type === 'myProfile') {
      await savedProfile();
      setIsEdit((prev) => ({ ...prev, [type]: false }));
    } else {
      await savedPassword();
      setIsEdit((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleRefreshButton = () => {
    window.location.reload();
  };

  return (
    <div className="flex w-screen flex-col space-y-4  p-4 px-[20px] *:bg-white">
      <Section>
        <div className="flex justify-between items-center">
          <Title title="내 프로필" />
          <button
            onClick={handleRefreshButton}
            className="p-1 border rounded-full transition-transform duration-300 ease-in-out transform group"
          >
            <FiRefreshCw className="size-4 group-hover:animate-spin text-Grey-300" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex flex-row space-x-4 ">
            <h2 className="min-w-[85px]">이미지</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-col space-y-4 justify-center">
                <div className="flex size-spacing-19 items-center justify-center gap-4 rounded-xl  bg-white p-[10px] border-2 border-Blue-200 w-[300px] h-[300px]">
                  {/* 편집 모드 */}
                  {previewUrl ? (
                    <Image
                      src={previewUrl || user?.imageUrl || '/profile.png'}
                      alt="profileImage"
                      width={200}
                      height={200}
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
                <div className="flex flex-col space-y-2">
                  <label
                    className="flex border border-Grey-200 py-[10px] px-[20px] rounded-xl text-[12px] justify-center items-center hover:border-Blue-200 transition-colors"
                    htmlFor="profile"
                  >
                    이미지 선택
                  </label>
                  <input
                    name="profile"
                    type="file"
                    id="profile"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <Button
                    classNames="hover:bg-Blue-200 transition-colors"
                    variant="nonBorderButton"
                    onClick={uploadImage}
                  >
                    변경하기
                  </Button>
                </div>
              </div>
            ) : (
              // 편집 모드 x
              <div className="flex size-spacing-19 items-center justify-center gap-4 rounded-xl  bg-white p-[10px] border-2 border-Blue-200 w-[300px] h-[300px]">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="profileImage"
                    width={200}
                    height={200}
                    className="object-cover rounded-xl  w-full h-full"
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
                  value={formValues.nickname}
                  onChange={handleInputChange}
                  placeholder={user?.nickname}
                  className="border-Grey-200"
                />

                <Button
                  onClick={() => void handleNicknameCheck()}
                  loading={isLoading.nicknameCheck}
                  variant="nonBorderButton"
                >
                  중복 확인
                </Button>
              </div>
            ) : (
              <span>{user?.nickname}</span>
            )}
          </div>

          <div className="flex flex-row items-center justify-between space-x-4 ">
            <div className="flex flex-row ">
              <h2 className="min-w-[100px]">계정</h2>
              <span>{user?.email}</span>
            </div>
            {isEdit.myProfile ? (
              <div className="space-x-4">
                <Button onClick={() => onCancelEditHandler('myProfile')} variant="none">
                  취소
                </Button>
                <Button
                  onClick={() => void onFinishEdit('myProfile')}
                  loading={isLoading.profileSave}
                  variant="nonBorderButton"
                >
                  저장
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={() => onStartEdit('myProfile')} variant="nonBorderButton">
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
                  value={formValues.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요"
                  className="border-Grey-200 text-14"
                />
              ) : (
                <div className="text-Grey-400">비밀번호 설정</div>
              )}
            </div>
            {isEdit.default ? (
              <div className="space-x-4">
                <Button variant="none" onClick={() => onCancelEditHandler('default')}>
                  취소
                </Button>
                <Button variant="nonBorderButton" onClick={() => void onFinishEdit('default')}>
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
