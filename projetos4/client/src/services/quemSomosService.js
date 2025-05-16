import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/quemsomos';

export const getMembros = async () => {
  const response = await axios.get(`${API_BASE_URL}/findall`);
  return response.data;
};

export const postMembro = async (formData) => {
  const response = await axios.post(API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
