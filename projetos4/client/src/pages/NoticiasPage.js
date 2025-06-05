// src/pages/NoticiasPage.jsx (Public-facing)
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Keep framer-motion for animations
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/noticias';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca notícias do backend
  const getNoticias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/findall`);
      setNoticias(response.data);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      // You might want to display an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNoticias();
  }, []);

  if (loading) {
    return <div className="loading">Carregando notícias...</div>;
  }

  return (
    <div className="about-page"> {/* Consider renaming this class to 'noticias-page' for clarity */}
      <h1>Últimas Notícias</h1>

      {noticias.length === 0 ? (
        <p>Nenhuma notícia cadastrada no momento.</p>
      ) : (
        <ul className="page-list">
          {noticias.map((n) => (
            <motion.li
              className="motion-list-item"
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              <h3>{n.titulo}</h3>
              <p><strong>Conteúdo:</strong> {n.conteudo}</p>
              <p><strong>Publicado em:</strong> {new Date(n.dataPublicacao).toLocaleDateString('pt-BR')}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoticiasPage;