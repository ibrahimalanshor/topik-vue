import axios from '@/common/axios';

export async function getTopics() {
  return (await axios.get('/api/topics')).data;
}
