import axios from 'axios';

export const login = async ({ id, password }: LoginProps) => {
  try {
    const res = await axios.post('/login', { id, password });
    return res.data;
  } catch (e) {
    console.warn(e);
  }
};

interface LoginProps {
  id: string;
  password: string;
}
