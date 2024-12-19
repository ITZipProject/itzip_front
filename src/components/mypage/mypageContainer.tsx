'use client';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

import { loadingAtom } from '@/atoms/formAtoms';
import useUser from '@/hooks/mypage/useUser';
import { tokenAtom, clearTokenAtom } from '@/store/useTokenStore';
import profile from '../../../public/profile.png';
import { checkNickname, editNickname, editPassword } from '@/api/mypage/mypage.action';

export default function MyPageContainer() {
  const [token] = useAtom(tokenAtom);
  const [, clearToken] = useAtom(clearTokenAtom);
  const { user, userLogout } = useUser(token.accessToken ?? '');
  const [loading] = useAtom(loadingAtom);
  const [isEdit, setIsEdit] = useState({
    myProfile: false,
    default: false,
  });
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState({
    nicknameOk: false,
    passwordOk: false,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    setLoading(true);
    try {
      if (!nickname || !token.accessToken) return;
      await checkNickname(nickname, token.accessToken);
      setIsOk((prev) => ({ ...prev, nicknameOk: true }));
      toast.success('사용 가능한 닉네임입니다');
    } catch (err) {
      console.error(err);
      setIsOk((prev) => ({ ...prev, nicknameOk: false }));
      toast.error('사용할 수 없는 닉네임입니다');
    } finally {
      setLoading(false);
    }
  };

  const updateUserNickname = async () => {
    setLoading(true);
    try {
      if (!nickname || !token.accessToken) return;
      await editNickname(nickname, token.accessToken);
      toast.success('닉네임이 변경되었습니다');
    } catch (err) {
      console.error(err);
      toast.error('닉네임 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async () => {
    setLoading(true);
    try {
      if (!password || !token.accessToken) return;
      await editPassword(password, token.accessToken);
      toast.success('비밀번호가 변경되었습니다');
      setIsEdit((prev) => ({ ...prev, default: false }));
      setPassword('');
    } catch (err) {
      console.error(err);
      toast.error('비밀번호 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const savedProfile = async () => {
    setLoading(true);
    try {
      if (!token.accessToken) return;

      if (nickname && nickname !== user?.nickname && isOk.nicknameOk) {
        await updateUserNickname();
      }

      toast.success('프로필이 저장되었습니다');
      setIsEdit((prev) => ({ ...prev, myProfile: false }));
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('프로필 저장에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const onFinishEdit = async (type: 'myProfile' | 'default') => {
    if (type === 'myProfile') {
      await savedProfile();
    } else {
      await updateUserPassword();
    }
  };

  const handleLogout = () => {
    clearToken();
    userLogout();
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#F9FBFC] p-4 space-y-4">
      <section className="w-full max-w-[900px] mx-auto shadow-md border-2 py-[20px] px-[30px] rounded-2xl space-y-8">
        <h2 className="font-bold text-[20px]">내 프로필</h2>
        <div className="space-y-4">
          <div className="flex flex-row space-x-4">
            <h2 className="min-w-[85px]">이미지</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row space-x-4">
                <div className="flex w-[100px] h-[100px] gap-4 border-2 border-Blue-200 p-[10px] rounded-xl bg-white justify-center items-center">
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
                  className="cursor-pointer border border-Grey-200 py-[10px] px-[20px] rounded-xl h-[40px]"
                  htmlFor="profile"
                >
                  변경
                </label>
                <input
                  type="file"
                  id="profile"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div className="flex w-[200px] h-[200px] gap-4 border-2 border-Blue-200 p-[10px] rounded-xl bg-white justify-center items-center">
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

          <div className="flex flex-row space-x-4 max-w-[500px] items-center">
            <h2 className="min-w-[85px]">닉네임</h2>
            {isEdit.myProfile ? (
              <div className="flex flex-row gap-4 items-center">
                <input
                  name="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={user?.nickname}
                  className="border-Grey-200"
                />
                <button
                  onClick={nicknameCheck}
                  className="border border-Grey-200 py-[10px] px-[20px] rounded-xl text-[12px]"
                >
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
                  onClick={() => onFinishEdit('myProfile')}
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
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
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
                  onClick={() => onFinishEdit('default')}
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
      <button onClick={handleLogout} className="self-end">
        {'로그아웃 >'}
      </button>
    </div>
  );
}
