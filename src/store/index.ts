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

interface UserType {
  name: string | null;
  accessToken: string | null;
  login: boolean;
}
