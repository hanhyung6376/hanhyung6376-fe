import axios, { AxiosError } from 'axios';
import { LoginProps } from '../types/auth';

const request = async ({ url, method, params }: RequestProps) => {
  const result: Response = {
    data: null,
    error: null,
  };

  try {
    const res = await axios({
      url,
      method,
      data: params,
    });

    result.data = res.data;
  } catch (e) {
    result.error = e as unknown as AxiosError;
  }

  return;
};

export const login = async ({ id, password }: LoginProps) =>
  request({
    url: '/login',
    method: 'post',
    params: {
      id,
      password,
    },
  });

interface Response {
  data: any;
  error: null | AxiosError;
}

interface RequestProps {
  url: string;
  method: string;
  params: object;
}
