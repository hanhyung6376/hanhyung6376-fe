import { atom } from 'recoil';

export const userAtom = atom<UserType>({
  key: 'user',
  default: {
    name: null,
    login: false,
  },
});

interface UserType {
  name: string | null;
  login: boolean;
}
