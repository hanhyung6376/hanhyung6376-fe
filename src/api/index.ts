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

  return result;
};

export const login = ({ id, password }: LoginProps) =>
  request({
    url: '/login',
    method: 'post',
    params: {
      id,
      password,
    },
  });

export const verificationUser = (id: string) =>
  request({
    url: `/users/${id}`,
    method: 'get',
  });

export const getProducts = ({ page, size }: ProductVariables) =>
  request({
    url: `/products?page=${page}&size=${size}`,
    method: 'get',
  });

export const getProduct = (productId: string) =>
  request({
    url: `/products/${productId}`,
    method: 'get',
  });

interface Response {
  data: any;
  error: null | AxiosError;
}

interface RequestProps {
  url: string;
  method: string;
  params?: object;
}

interface ProductVariables {
  page: number;
  size: number;
}
