'use client';
import Modal from '@/app/(Auth)/auth/authModal';
import { useModal } from '@/lib/context/ModalContext';
import Input from '../common/input';
import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/16/solid';

interface ModalProps {
  modalId: string;
}

export const EditProfileModal: React.FC<ModalProps> = ({ modalId }) => {
  const { closeModal, openModals } = useModal();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState('');
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
  const onChangeValue = () => {};
  if (!openModals.includes(modalId)) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('good');
    closeModal('editProfileModal');
  };
  return (
    <Modal isOpen={true} onClose={() => closeModal(modalId)}>
      {/* 닉네임 수정, 비밀번호 변경, 프로필 이미지 변경, 닉네임 중복체크 */}

      <form onSubmit={onSubmit} className="flex flex-col">
        <label
          htmlFor="photo"
          className="border-2 size-40 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-full border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진 변경</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />

        <span>닉네임</span>
        <Input name="nickname" onChange={onChangeValue} placeholder="nickname" value={nickname} />
        <button>닉네임 중복체크</button>
        <span>비밀번호</span>
        <Input name="password" onChange={onChangeValue} placeholder="password" value={password} />
        <button>수정하기</button>
      </form>
    </Modal>
  );
};
