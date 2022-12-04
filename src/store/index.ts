import { atom } from 'recoil';
import { v1 } from 'uuid';
import { Product } from '../types/product';

export const userAtom = atom<User>({
  key: `user/${v1()}`,
  default: {
    name: null,
    accessToken: null,
    login: false,
  },
});

export const pageAtom = atom<number>({
  key: `page/${v1()}`,
  default: 0,
});

export const infiniteAtom = atom<Infinite>({
  key: `scroll/${v1()}`,
  default: {
    scroll: 0,
    page: 1,
    back: false,
    product: [],
  },
});

interface User {
  name: string | null;
  accessToken: string | null;
  login: boolean;
}

interface Infinite {
  scroll: number;
  back: boolean;
  product: Product[];
  page: number;
}
