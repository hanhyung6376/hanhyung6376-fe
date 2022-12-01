import { useRecoilState } from 'recoil';
import { userAtom } from 'store';
import * as api from 'api';
import { LoginProps } from '../types/auth';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);

  const onLogin = async ({ id, password }: LoginProps) => {
    const verification = await api.verificationUser(id);

    if (verification.error) {
      return;
    }
    const login = await api.login({ id, password });
    if (login.data) {
      const {
        data: {
          user: { NAME },
        },
      } = login.data;
      setUser({ name: NAME, login: true });
      router.push('/');
    }
  };

  const onLogout = () => {
    setUser({ name: null, login: false });
  };

  return { user, onLogin, onLogout };
};

export default useAuth;
