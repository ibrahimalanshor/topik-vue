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

export async function postTopic(body) {
  return (await axios.post('/api/topics', body)).data;
}

export async function patchTopic(id, body) {
  return (await axios.patch(`/api/topics/${id}`, body)).data;
}
