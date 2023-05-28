import axios from '@/common/axios';

export async function postLogin(body) {
  return (await axios.post('/api/login', body)).data;
}
