import { useAtom } from 'jotai';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { updateProfileImage } from '@/api/mypage/mypage.action';
import { mypageFormLoadingAtom, mypageFormValuesAtom } from '@/atoms/formAtoms';

import useUser from './useUser';

export function useProfileForm() {
  const { user, refreshUser, checkUserNickname, updateNickname, updatePassword } = useUser();
  const [formValues, setFormValues] = useAtom(mypageFormValuesAtom);

  const [, setIsLoading] = useAtom(mypageFormLoadingAtom);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOk, setIsOk] = useState({
    nicknameOk: false,
    passwordOk: false,
  });

  // 폼 입력값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 변경 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 이미지 상태 업데이트
      setFormValues((prev) => ({ ...prev, image: file }));

      // 새로운 미리보기 URL 생성
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      setIsLoading((prev) => ({ ...prev, imageLoading: true }));
      try {
        // 이미지 업로드 API 호출
        const res = await updateProfileImage(file);

        const { imageUrl } = res.data;

        setFormValues((prev) => ({ ...prev, image: imageUrl }));

        toast.success('이미지 업로드 성공');
      } catch (err) {
        console.error('이미지 업로드 실패', err);
        toast.error('이미지 업로드에 실패했습니다.');
      } finally {
        setIsLoading((prev) => ({ ...prev, imageLoading: false }));
      }
    }
  };

  // 닉네임 중복 체크
  const handleNicknameCheck = async () => {
    if (!formValues.nickname) return;
    const isValid = await checkUserNickname(formValues.nickname);
    setIsOk((prev) => ({ ...prev, nicknameOk: isValid }));
  };

  // 프로필 저장
  const savedProfile = async () => {
    setIsLoading((prev) => ({ ...prev, profileSave: true }));
    try {
      if (formValues.nickname && formValues.nickname !== user?.nickname && isOk.nicknameOk) {
        const success = await updateNickname(formValues.nickname);
        if (success) {
          await refreshUser();
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('프로필 저장에 실패했습니다');
    } finally {
      setIsLoading((prev) => ({ ...prev, profileSave: false }));
    }
  };

  // 비밀번호 저장
  const savedPassword = async () => {
    setIsLoading((prev) => ({ ...prev, passwordSave: true }));

    try {
      if (formValues.password) {
        const success = await updatePassword(formValues.password);
        if (success) {
          setFormValues((prev) => ({ ...prev, password: '' }));
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('비밀번호 저장에 실패했습니다');
    } finally {
      setIsLoading((prev) => ({ ...prev, profileSave: false }));
    }
  };

  // 폼 취소
  const onCancelEdit = () => {
    setFormValues((prev) => ({ ...prev, nickname: '', password: '', image: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return {
    formValues,
    setFormValues,
    previewUrl,
    setPreviewUrl,
    isOk,
    setIsOk,
    handleInputChange,
    handleImageChange,
    handleNicknameCheck,
    savedProfile,
    savedPassword,
    onCancelEdit,
  };
}
