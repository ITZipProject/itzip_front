'use client';
import Modal from '@/app/(Auth)/auth/authModal';
import { useModal } from '@/lib/context/ModalContext';
import Input from '../common/input';
import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/16/solid';
import instance from '@/api/axiosInstance';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '@/store/useTokenStore';

interface ModalProps {
  modalId: string;
}
interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
const EditButton = ({ onClick, text, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="primary-btn bg-Grey-100 h-spacing-12 disabled:bg-Grey-100 disabled:text-white disabled:cursor-not-allowed rounded-radius-03 text-white font-semibold text-14 mt-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export const EditProfileModal: React.FC<ModalProps> = ({ modalId }: ModalProps) => {
  const { closeModal, openModals } = useModal();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isOk, setIsOk] = useState({
    nicknameDuplicate: false,
  });
  const checkDuplicateNickname = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get('/mypage/checkDuplicateNickname', {
        params: {
          nickname,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 200) {
        setIsOk((prevState) => ({ ...prevState, nicknameDuplicate: true }));
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('이미 사용 중인 닉네임입니다.');
      }
    } catch (err) {
      console.error(err);
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  const changeProfileImage = async () => {
    setIsLoading(true);
    try {
      const res = await instance.patch(
        '/mypage/profileImage',
        { file: preview },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const changeNickname = async () => {
    setIsLoading(true);
    try {
      const res = await instance.patch(
        '/mypage/nickname',
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const changePassword = async () => {
    setIsLoading(true);
    try {
      const res = await instance.patch(
        '/mypage/password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    // 사진의 url을 가져오기 위함 -> 사진을 업로드 시 페이지에 업로드한 사진을 렌더하기 위해서
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nickname') setNickname(value);
    if (name === 'password') setPassword(value);
  };
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (validatePassword(newPassword)) {
      // 비밀번호가 유효한 경우
      setIsPasswordValid(true);
    } else {
      // 비밀번호가 유효하지 않은 경우
      setIsPasswordValid(false);
    }
  };

  if (!openModals.includes(modalId)) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (preview !== '') {
        await changeProfileImage();
      }
      if (isOk.nicknameDuplicate && nickname !== '') {
        await changeNickname();
      }
      if (password !== '') {
        await changePassword();
      }
      closeModal('editProfileModal');
      alert('프로필이 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error(err);
      alert('프로필 수정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center size-40 cursor-pointer border-2 border-dashed border-neutral-300 rounded-full bg-center bg-cover text-neutral-300 self-center"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <button onClick={() => changeProfileImage} className="text-neutral-400 text-sm">
                사진 변경
              </button>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />

        <span>닉네임</span>
        <Input
          name="nickname"
          onChange={onChangeValue}
          placeholder="닉네임을 입력해주세요."
          value={nickname}
        />
        <EditButton
          onClick={(e) => {
            e.preventDefault(); // 이벤트의 기본 동작을 방지
            void checkDuplicateNickname();
          }}
          text={isLoading ? '닉네임 중복체크 하는 중...' : '닉네임 중복체크'}
        />
        <span>비밀번호</span>
        <Input
          name="password"
          onChange={onChangeValue}
          placeholder="특수문자를 포함한 8자리 이상"
          value={password}
        />
        {/* <EditButton onClick={() => void changePassword()} text="비밀번호 수정" /> */}

        <EditButton type="submit" text="수정 완료하기" />
      </form>
    </Modal>
  );
};
