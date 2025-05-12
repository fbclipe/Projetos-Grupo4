// src/services/faqService.js
// Stubbed FAQ service with sample data for frontend development.

const samplePerguntas = [
  { id: 1, pergunta: 'O que é este sistema?' },
  { id: 2, pergunta: 'Como posso adicionar uma pergunta?' },
  { id: 3, pergunta: 'Quem desenvolveu este site?' },
];

const sampleRespostas = {
  1: [{ id: 1, resposta: 'Este sistema é um exemplo de site corporativo com React e Spring Boot.' }],
  2: [{ id: 2, resposta: 'Você não pode adicionar perguntas no momento, pois este é um exemplo.' }],
  3: [{ id: 3, resposta: 'Este site foi desenvolvido por Israel Duclerc e equipe.' }],
};

export const getPerguntas = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(samplePerguntas), 500);
  });
};

export const getRespostas = async (perguntaId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleRespostas[perguntaId] || []), 500);
  });
};
