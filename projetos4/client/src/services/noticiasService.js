import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/noticias';

export const getNoticias = async () => {
  const response = await axios.get(`${API_BASE_URL}/findall`);
  return response.data;
};

export const criarNoticia = async (noticia) => {
  const response = await axios.post(API_BASE_URL, noticia);
  return response.data;
};

export const deletarNoticia = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
