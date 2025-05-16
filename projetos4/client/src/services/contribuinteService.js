import axios from 'axios';

const API = 'http://localhost:8080/contribuintes';

export const getTodos = () => axios.get(API);
export const getPorId = (id) => axios.get(`${API}/${id}`);
export const criar = (contribuinte) => axios.post(API, contribuinte);
export const atualizar = (id, contribuinte) => axios.put(`${API}/${id}`, contribuinte);
export const deletar = (id) => axios.delete(`${API}/${id}`);
