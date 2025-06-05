// src/pages/QuemSomosMainPage.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMembros } from '../services/quemSomosService'; // Importa do service

const QuemSomosMainPage = () => {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembros();
  }, []);

  const fetchMembros = async () => {
    try {
      const data = await getMembros();
      setMembros(data);
    } catch (error) {
      // Erro já logado no service, trate a UI de forma elegante se necessário
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando "Quem Somos"...</div>;
  }

  return (
    <div className="about-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Quem Somos</h1>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#555', marginBottom: '40px' }}>
        Conheça a equipe por trás do nosso trabalho.
      </p>

      {membros.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#777' }}>
          Nenhum membro cadastrado ainda.
        </p>
      ) : (
        <ul
          className="quem-somos-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Cartões ligeiramente maiores para a página principal
            gap: '30px',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {membros.map((membro) => (
            <motion.li
              className="motion-list-item"
              key={membro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#ffffff',
              }}
            >
              {membro.fotoBase64 && (
                <img
                  src={`data:image/jpeg;base64,${membro.fotoBase64}`}
                  alt={membro.nome}
                  style={{
                    width: '180px', // Imagem maior para a página principal
                    height: '180px',
                    borderRadius: '50%', // Imagem circular
                    objectFit: 'cover',
                    marginBottom: '15px',
                    border: '3px solid #007bff', // Borda sutil
                  }}
                />
              )}
              <h3 style={{ margin: '10px 0', color: '#333', fontSize: '1.4em' }}>{membro.nome}</h3>
              <p style={{ color: '#666', fontSize: '1.1em' }}>{membro.cargo}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuemSomosMainPage;