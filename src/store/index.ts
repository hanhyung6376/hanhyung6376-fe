import { atom } from 'recoil';

export const userAtom = atom<UserType>({
  key: 'register',
  default: {
    id: null,
    login: false,
  },
});

interface UserType {
  id: string | null;
  login: boolean;
}
