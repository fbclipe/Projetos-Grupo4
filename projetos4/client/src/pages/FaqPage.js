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
      const faqsComRespostas = await Promise.all(
        perguntas.map(async (pergunta) => {
          const res = await axios.get(`${API_BASE_URL}/respostas/${pergunta.id}`);
          return { ...pergunta, respostas: res.data };
        })
      );

      setFaqs(faqsComRespostas);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
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

      <ul className="page-list">
        {faqs.length === 0 && <li>Nenhuma FAQ cadastrada.</li>}

        {faqs.map((faq) => (
          <li key={faq.id} style={{ marginBottom: '20px' }}>
            <strong>Pergunta:</strong> {faq.pergunta}
            <br />
            {faq.respostas.length === 0 ? (
              <em>Sem respostas ainda.</em>
            ) : (
              <>
                <strong>Respostas:</strong>
                <ul>
                  {faq.respostas.map((r) => (
                    <li key={r.id}>{r.resposta}</li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqPage;
