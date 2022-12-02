import { atom } from 'recoil';
import { v1 } from 'uuid';

export const userAtom = atom<UserType>({
  key: `user/${v1()}`,
  default: {
    name: null,
    accessToken: null,
    login: false,
  },
});

export const pageAtom = atom({
  key: `page/${v1()}`,
  default: 0,
});

interface UserType {
  name: string | null;
  accessToken: string | null;
  login: boolean;
}
