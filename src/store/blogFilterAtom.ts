import { atom } from 'jotai';

import { BlogFilterState } from '@/types/blog/common';

export const blogFilterAtom = atom<BlogFilterState>({
  sortType: 'NEWEST',
  page: 0,
  size: 12,
});
