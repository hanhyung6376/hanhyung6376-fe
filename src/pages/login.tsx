import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import LoginInput from '../components/LoginInput';

const LoginPage: NextPage = () => {
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
    const regExp = /^[A-Za-z0-9]*$/;
    if (id.length < 5 || id.length > 30) {
      setError({ ...error, id: true });
      return;
    }

    if (!regExp.test(id)) {
      setError({ ...error, id: true });
      return;
    }

    setError({ ...error, id: false });
  };

  const checkUserPassword = () => {
    const { password } = user;
    const hasSmall = /[a-z]/;
    const hasLarge = /[A-Z]/;
    const hasNumber = /[0-9]/;

    const result = hasSmall.test(password) && hasLarge.test(password) && hasNumber.test(password);

    if (password.length < 8 || password.length > 30) {
      setError({ ...error, password: true });
      return;
    }

    if (!result) {
      setError({ ...error, password: true });
      return;
    }

    setError({ ...error, password: false });
  };

  useEffect(() => {
    if (!error.id && !error.password && user.id && user.password) {
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
        <LoginButton disabled={login ? false : true}>로그인</LoginButton>
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
