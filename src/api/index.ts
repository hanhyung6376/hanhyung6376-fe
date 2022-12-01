import axios from 'axios';
import { LoginProps } from '../types/auth';

export const login = async ({ id, password }: LoginProps) => {
  try {
    const res = await axios.post('/login', { id, password });
    return res.data;
  } catch (e) {
    console.warn(e);
  }
};
