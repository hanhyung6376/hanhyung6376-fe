import { atom } from 'recoil';
import { v1 } from 'uuid';
import { Product } from '../types/product';

export const userAtom = atom<User>({
  key: `user/${v1()}`,
  default: {
    name: null,
    accessToken: null,
    id: null,
  },
});

export const infiniteAtom = atom<Infinite>({
  key: `scroll/${v1()}`,
  default: {
    scroll: 0,
    page: 1,
    product: [],
    popState: false,
  },
});

interface User {
  name: string | null;
  accessToken: string | null;
  id: string | null;
}

interface Infinite {
  scroll: number;
  product: Product[];
  page: number;
  popState: boolean;
}
