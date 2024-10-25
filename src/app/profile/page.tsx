'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutServerAction } from './actions';
import { clearTokenAtom } from '@/store/useTokenStore';
import { useAtom } from 'jotai';
import { useModal } from '@/lib/context/ModalContext';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [, clearTokens] = useAtom(clearTokenAtom);
  const { openModal } = useModal();
  const logOut = async () => {
    setLoading(true);

    try {
      await logoutServerAction();
      clearTokens();

      // 로그아웃 실패 로그 보려면 주석
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // api - 미구현
  const out = () => {};

  // useEffect(() => {
  //   const me = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await instance.get('/user', {});
  //       console.log('me data___', res);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   me();
  // }, []);

  return (
    <div className="flex h-screen flex-col bg-[#F9FBFC] p-4">
      <div className="rounded-lg border-2 border-[#3733ED] px-[16px] py-[20px]">
        <div className="flex items-center justify-between pb-2">
          <div className="flex gap-4">
            <div className="size-16 rounded-full bg-slate-400" />
            <div className="flex flex-col justify-center">
              <span className="font-semibold">userName</span>
              <span className="text-[12px] text-[#A3A3A3]">Email</span>
            </div>
          </div>
          <div>
            <button
              onClick={() => openModal('editProfileModal')}
              className="rounded-md border p-2 text-[12px] font-normal text-[#D9D9D9] hover:border-[#3733ED] hover:text-[#3733ED]"
            >
              프로필 수정
            </button>
          </div>
        </div>
        <div className="w-full whitespace-pre-wrap break-words font-normal text-[12px] text-[#474747]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo reiciendis illum at nulla
          recusandae quasi aliquid ut autem, fugiat adipisci facilis accusamus laborum tempora,
          dignissimos sequi rerum dolore explicabo quam?
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={logOut} disabled={loading}>
          {loading ? '로그아웃 중...' : '로그아웃'}
        </button>
        <button className="text-gray-300" onClick={out} disabled={loading}>
          {loading ? '회원탈퇴 중...' : '회원탈퇴 >'}
        </button>
      </div>
      <div></div>
    </div>
  );
}
