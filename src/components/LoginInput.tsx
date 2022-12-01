import React, { FC } from 'react';
import styled from 'styled-components';

const LoginInput: FC<Props> = (props) => {
  const { title, type, value, onChange, name, onBlur, error, message, margin } = props;
  return (
    <div style={{ marginBottom: margin ? '16px' : undefined }}>
      <Text>{title}</Text>
      <TextBox>
        <TextInput type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} />
      </TextBox>
      {error ? <Warning>{message}</Warning> : null}
    </div>
  );
};

export default LoginInput;

interface Props {
  title: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: boolean;
  message: string;
  margin?: boolean;
}

const Text = styled.p`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const Warning = styled.p`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

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
