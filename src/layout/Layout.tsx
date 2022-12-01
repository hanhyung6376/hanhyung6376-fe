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
        <Link href='/login'>
          {user.login ? (
            <>
              <p>{user.name}</p>
              <br />
              <p>logout</p>
            </>
          ) : (
            <p>login</p>
          )}
        </Link>
      </Header>
      {children}
    </>
  );
};

export default Layout;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;
