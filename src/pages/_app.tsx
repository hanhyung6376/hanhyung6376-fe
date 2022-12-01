import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import Layout from 'layout/Layout';
import AuthCheck from 'utilities/AuthCheck';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <RecoilRoot>
          <AuthCheck>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthCheck>
        </RecoilRoot>
      </Content>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
