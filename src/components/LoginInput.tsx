import React, { FC } from 'react';
import styled from 'styled-components';

const LoginInput: FC<Props> = ({ title, type }) => {
  return (
    <>
      <div>{title}</div>
      <TextBox>
        <TextInput type={type} />
      </TextBox>
    </>
  );
};

export default LoginInput;

interface Props {
  title: string;
  type: string;
}

const TextBox = styled.div`
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border-radius: 12px;
`;

const TextInput = styled.input`
  border: None;
  background: #f7f7fa;
  width: 100%;
`;
