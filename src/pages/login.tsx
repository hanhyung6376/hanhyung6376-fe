import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import LoginInput from '../components/LoginInput';
import useAuth from '../hooks/useAuth';
import { checkId, checkPassword } from 'utilities/auth';

const LoginPage: NextPage = () => {
  const { onLogin } = useAuth();
  const [login, setLogin] = useState(false);
  const [user, , onChange] = useInput({
    id: '',
    password: '',
  });
  const [error, setError] = useState({
    id: false,
    password: false,
  });

  const checkUserId = () => {
    const { id } = user;
    const result = checkId(id);

    if (!result) {
      setError({ ...error, id: true });
    }

    setError({ ...error, id: false });
  };

  const checkUserPassword = () => {
    const { password } = user;
    const result = checkPassword(password);

    if (!result) {
      setError({ ...error, password: true });
    }

    setError({ ...error, password: false });
  };

  const onClick = async () => {
    const { id, password } = user;
    await onLogin({ id, password });
  };

  useEffect(() => {
    const { id, password } = user;
    if (!error.id && !error.password && checkId(id) && checkPassword(password)) {
      setLogin(true);
      return;
    }
    setLogin(false);
  }, [error, user]);

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <LoginInput
          title='야이디'
          type='text'
          name='id'
          value={user.id}
          onChange={onChange}
          onBlur={checkUserId}
          error={error.id}
          message='올바른 아이디 형식으로 입력해주세요.'
        />
        <LoginInput
          title='비밀번호'
          type='password'
          name='password'
          value={user.password}
          onChange={onChange}
          onBlur={checkUserPassword}
          error={error.password}
          message='올바른 비밀번호 형식으로 입력해주세요.'
        />
        <LoginButton disabled={!login} onClick={onClick}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
