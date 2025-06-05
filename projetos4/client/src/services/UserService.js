// services/UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/users';

export const cadastrarUsuario = async (userData) => {
  try {
    console.log('Enviando dados para cadastro:', userData);
    const response = await axios.post(`${API_BASE_URL}/cadastrar`, userData);
    console.log('Resposta do servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro detalhado:', error);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    throw error;
  }
};

export const loginUsuario = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, userData);
  return response.data;
};

// Validações auxiliares
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};