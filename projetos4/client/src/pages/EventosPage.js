// src/pages/EventosPage.jsx (This is the public-facing page)
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Still need axios to fetch events

const API_BASE_URL = 'http://localhost:8080/api/eventos'; // Keep the base URL

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events from the backend
  const getEventos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listar`);
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      // You might want to display an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventos();
  }, []);

  if (loading) {
    return <div>Carregando eventos...</div>;
  }

  return (
    <div className="about-page"> {/* Consider renaming this class to 'eventos-page' for clarity */}
      <h1>Nossos Eventos</h1>

      {eventos.length === 0 ? (
        <p>Nenhum evento cadastrado no momento.</p>
      ) : (
        <ul className="page-list">
          {eventos.map((evento) => (
            <li key={evento.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3>{evento.titulo}</h3>
              <p><strong>Descrição:</strong> {evento.descricao}</p>
              <p><strong>Data:</strong> {evento.data}</p>
              <p><strong>Link:</strong>{' '}
                <a href={evento.link} target="_blank" rel="noreferrer">
                  {evento.link}
                </a>
              </p>
              <p><strong>Parceiros:</strong> {evento.parceiros}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventosPage;