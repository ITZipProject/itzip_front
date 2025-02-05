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
  const [isOk, setIsOk] = useState({
    nicknameOk: false,
    passwordOk: false,
  });

  // 폼 입력값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): Promise<File | null> => {
    return new Promise((resolve) => {
      const file = e.target.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      // 업로드를 위한 File 객체 저장
      setImageFile(file);

      // 미리보기를 위한 URL 생성
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result); // 미리보기용 URL 저장
        resolve(file); // API 호출용 File 객체 반환
      };
      fileReader.readAsDataURL(file);
    });
  };

  const uploadImage = async () => {
    if (imageFile) {
      try {
        const response = await updateProfileImage(imageFile);
        console.log(response);
        // 성공 처리
        toast.success('이미지 변경이 완료되었습니다.');
      } catch (error) {
        // 에러 처리
        console.log(error);
        toast.error('이미지 변경에 문제가 발생하였습니다. 다시 시도해주세요.');
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
    previewUrl, // 미리보기 URL 상태
    setPreviewUrl,
    isOk,
    setIsOk,
    handleInputChange,
    handleImageChange,
    handleNicknameCheck,
    savedProfile,
    savedPassword,
    onCancelEdit,
    uploadImage,
  };
}
