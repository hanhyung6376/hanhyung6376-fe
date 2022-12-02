import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useInput from 'hooks/useInput';
import LoginInput from '../components/LoginInput';
import useAuth from '../hooks/useAuth';
import { checkId, checkPassword } from 'utilities/auth';

const LoginPage: NextPage = () => {
  const { user, onLogin } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [input, , onChange] = useInput({
    id: '',
    password: '',
  });
  const [error, setError] = useState({
    id: false,
    password: false,
    login: false,
  });

  const checkUserId = () => {
    const { id } = input;
    const result = checkId(id);

    if (!result) {
      setError({ ...error, id: true });
      return;
    }

    setError({ ...error, id: false });
  };

  const checkUserPassword = () => {
    const { password } = input;
    const result = checkPassword(password);

    if (!result) {
      setError({ ...error, password: true });
      return;
    }

    setError({ ...error, password: false });
  };

  const onClick = async () => {
    const { id, password } = input;
    const res = await onLogin({ id, password });
    if (!res) {
      setError({ ...error, login: true });
    }
  };

  useEffect(() => {
    const { id, password } = input;
    if (!error.id && !error.password && checkId(id) && checkPassword(password)) {
      setLogin(true);
      return;
    }
    setLogin(false);
  }, [error, input]);

  useEffect(() => {
    if (user.login) {
      router.push('/');
    }
  }, [user]);

  return (
    <Form>
      <LoginInput
        title='야이디'
        type='text'
        name='id'
        value={input.id}
        onChange={onChange}
        onBlur={checkUserId}
        error={error.id}
        message='올바른 아이디 형식으로 입력해주세요.'
        margin
      />
      <LoginInput
        title='비밀번호'
        type='password'
        name='password'
        value={input.password}
        onChange={onChange}
        onBlur={checkUserPassword}
        error={error.password}
        message='올바른 비밀번호 형식으로 입력해주세요.'
      />
      <LoginButton disabled={!login} onClick={onClick}>
        로그인
      </LoginButton>
      {error.login ? <Warning>로그인 실패</Warning> : null}
    </Form>
  );
};

export default LoginPage;

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

const Warning = styled.div`
  text-align: center;
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
