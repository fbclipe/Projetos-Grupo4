import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/eventos';

export const getEventos = async () => {
  const response = await axios.get(`${API_BASE_URL}/listar`);
  return response.data;
};

export const criarEvento = async (evento) => {
  const response = await axios.post(`${API_BASE_URL}/cadastrar`, evento);
  return response.data;
};

export const deletarEvento = async (id) => {
  await axios.delete(`${API_BASE_URL}/deletar/${id}`);
};

export const buscarEventoPorId = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/buscar/${id}`);
  return response.data;
};

export const atualizarEvento = async (id, eventoAtualizado) => {
  const response = await axios.put(`${API_BASE_URL}/atualizar/${id}`, eventoAtualizado);
  return response.data;
};
