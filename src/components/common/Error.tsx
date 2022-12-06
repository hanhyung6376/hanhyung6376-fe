import { FC } from 'react';
import styled from 'styled-components';

const Error: FC<Props> = ({ message }) => <ErrorMessage>{message}</ErrorMessage>;

export default Error;

interface Props {
  message: string;
}

const ErrorMessage = styled.div`
  display: flex;
  height: calc(100vh - 200px);
  align-items: center;
  justify-content: center;
`;
