// src/services/quemSomosService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/quemsomos';

/**
 * Fetches all "Quem Somos" members from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of members.
 */
export const getMembros = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findall`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    throw error; // Re-throw to be handled by the component
  }
};

/**
 * Adds a new "Quem Somos" member to the backend.
 * @param {FormData} formData - FormData object containing 'nome', 'cargo', and 'foto'.
 * @returns {Promise<Object>} A promise that resolves to the added member data.
 */
export const addMembro = async (formData) => {
  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar membro:', error);
    throw error; // Re-throw to be handled by the component
  }
};

/**
 * Deletes a "Quem Somos" member by ID from the backend.
 * @param {number} id - The ID of the member to delete.
 * @returns {Promise<void>} A promise that resolves when the member is deleted.
 */
export const deleteMembro = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir membro:', error);
    throw error; // Re-throw to be handled by the component
  }
};