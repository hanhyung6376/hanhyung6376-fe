import { useRecoilState } from 'recoil';
import { userAtom } from 'store';
import * as api from 'api';
import { LoginProps } from 'types/auth';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom);

  const onLogin = async ({ id, password }: LoginProps) => {
    const login = await api.login({ id, password });
    if (login.data) {
      const {
        data: {
          user: { NAME, ID },
          accessToken,
        },
      } = login.data;
      setUser({ name: NAME, id: ID, accessToken });
      sessionStorage.setItem('auth', JSON.stringify({ accessToken, name: NAME, id: ID }));
      router.push('/');
      return true;
    }
  };

  const onLogout = () => {
    setUser({ name: null, id: null, accessToken: null });
    sessionStorage.removeItem('auth');
  };

  return { user, onLogin, onLogout };
};

export default useAuth;
