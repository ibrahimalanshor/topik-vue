import axios from '@/common/axios';

export async function getTopics(query) {
  return (
    await axios.get('/api/topics', {
      params: query,
    })
  ).data;
}

export async function getTopicById(id) {
  return (await axios.get(`/api/topics/${id}`)).data;
}

export async function postTopics(body) {
  return (await axios.post('/api/topics', body)).data;
}
