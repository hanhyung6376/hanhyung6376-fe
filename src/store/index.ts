import { atom } from 'recoil';

export const userAtom = atom<UserType>({
  key: 'register',
  default: {
    name: null,
    login: false,
  },
});

interface UserType {
  name: string | null;
  login: boolean;
}
