import axios from '@/common/axios';

export async function getChats(query) {
  return (
    await axios.get('/api/chats', {
      params: query,
    })
  ).data;
}

export async function postChat(body) {
  return (await axios.post('/api/chats', body)).data;
}
