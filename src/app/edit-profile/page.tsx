'use client';

import { PhotoIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editProfile } from './actions';
import Input from '@/components/common/input';
import Button from '@/components/common/button';

export default function EditProfile() {
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
  const [state, action] = useFormState(editProfile, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
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
              <div className="text-neutral-400 text-sm">
                사진 변경
                {state?.fieldErrors.photo}
              </div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" className="hidden" />
        <Input name="nickname" required placeholder="이름" type="text" />

        <Button text="작성 완료" modalId="" />
      </form>
    </div>
  );
}
