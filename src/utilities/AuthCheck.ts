import { useEffect, PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from 'store';
import * as api from '../api';

const AuthCheck = ({ children }: PropsWithChildren<any>) => {
  const [, setUser] = useRecoilState(userAtom);

  const verificationUser = async () => {
    const user = sessionStorage.getItem('auth');
    if (user) {
      const { accessToken, name, id } = JSON.parse(user);
      const verification = await api.verificationUser(id);

      if (verification.error) {
        return;
      }
      setUser({ accessToken, name, id });
    }
  };

  useEffect(() => {
    verificationUser();
  }, []);

  return children;
};

export default AuthCheck;
