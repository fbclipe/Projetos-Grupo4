// src/services/contribuinteService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/contribuintes';

/**
 * Fetches all contributors from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of contributors.
 */
export const getContribuintes = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contribuintes:', error);
    throw error;
  }
};

/**
 * Adds a new contributor to the backend.
 * @param {Object} contribuinteData - The data of the contributor to add.
 * @returns {Promise<Object>} A promise that resolves to the added contributor data.
 */
export const addContribuinte = async (contribuinteData) => {
  try {
    const response = await axios.post(API_BASE_URL, contribuinteData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar contribuinte:', error);
    throw error;
  }
};

/**
 * Deletes a contributor by ID from the backend.
 * @param {number} id - The ID of the contributor to delete.
 * @returns {Promise<void>} A promise that resolves when the contributor is deleted.
 */
export const deleteContribuinte = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar contribuinte:', error);
    throw error;
  }
};