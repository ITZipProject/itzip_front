import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { getDefaultStore } from 'jotai';

// 만료시간을 저장하는 기본 atom
export const expAtom = atomWithStorage<number | null>('exp', null);

// setter atom
export const setExpAtom = atom(null, (get, set, exp: number | null) => {
  set(expAtom, exp);
});

// clear atom
export const clearExpAtom = atom(null, (get, set) => {
  set(expAtom, null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('exp');
  }
});

// 유틸리티 함수들
const getExp = () => {
  const store = getDefaultStore();
  return store.get(expAtom);
};

const clearExp = () => {
  const store = getDefaultStore();
  store.set(clearExpAtom);
};

// React 컴포넌트에서 사용할 훅
const useExpStore = () => {
  const store = getDefaultStore();
  return {
    exp: store.get(expAtom),
    setExp: (exp: number | null) => store.set(setExpAtom, exp),
    clearExp: () => store.set(clearExpAtom),
  };
};

export { useExpStore, clearExp, getExp };
