// src/pages/FaqPage.js
import React, { useEffect, useState } from 'react';
import { getPerguntas, getRespostas } from '../services/faqService';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const perguntas = await getPerguntas();
      const faqsWithRespostas = await Promise.all(
        perguntas.map(async (pergunta) => {
          const respostas = await getRespostas(pergunta.id);
          return { ...pergunta, respostas };
        })
      );
      setFaqs(faqsWithRespostas);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando FAQs...</div>;
  }

  return (
    <div className="faq-page">
      {faqs.length === 0 && <p>Nenhuma FAQ disponível.</p>}
      {faqs.map((faq) => (
        <div key={faq.id} className="faq-item">
          <h3>{faq.pergunta}</h3>
          {faq.respostas.map((r) => (
            <p key={r.id}>{r.resposta}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
