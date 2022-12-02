import { useEffect, PropsWithChildren } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store';

const AuthCheck = ({ children }: PropsWithChildren<any>) => {
  const [, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const user = sessionStorage.getItem('auth');
    if (user) {
      const { accessToken, name } = JSON.parse(user);
      setUser({ accessToken, name, login: true });
    }
  }, []);

  return children;
};

export default AuthCheck;
