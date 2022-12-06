import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const Layout: FC<PropsWithChildren<any>> = ({ children }) => {
  const { user, onLogout } = useAuth();
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {user.name ? (
          <Wrapper>
            <p>{user.name}</p>
            <p onClick={onLogout}>logout</p>
          </Wrapper>
        ) : (
          <Link href='/login'>
            <p>login</p>
          </Link>
        )}
      </Header>
      {children}
    </>
  );
};

export default Layout;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;
