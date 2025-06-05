// src/pages/FaqPage.jsx (Public-facing)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/faqs';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar FAQs do backend
  const getFaqs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perguntas`);
      const perguntas = response.data;

      // Para cada pergunta, buscar suas respostas
      // Using Promise.all to fetch all answers concurrently
      const faqsComRespostas = await Promise.all(
        perguntas.map(async (pergunta) => {
          const res = await axios.get(`${API_BASE_URL}/respostas/${pergunta.id}`);
          return { ...pergunta, respostas: res.data };
        })
      );

      setFaqs(faqsComRespostas);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      // You might want to display an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  if (loading) return <div>Carregando FAQs...</div>;

  return (
    <div className="faq-page">
      <h1>Perguntas Frequentes</h1>

      {faqs.length === 0 ? (
        <p>Nenhuma FAQ cadastrada no momento.</p>
      ) : (
        <ul className="page-list">
          {faqs.map((faq) => (
            <li key={faq.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3>{faq.pergunta}</h3>
              {faq.respostas.length === 0 ? (
                <p><em>Sem respostas ainda.</em></p>
              ) : (
                <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
                  {faq.respostas.map((r) => (
                    <li key={r.id} style={{ marginBottom: '5px' }}>{r.resposta}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqPage;