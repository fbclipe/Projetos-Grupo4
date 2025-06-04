import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/faqs';

const FaqAdicionarPage = () => {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [perguntaId, setPerguntaId] = useState(null);
  const [respostasAdicionadas, setRespostasAdicionadas] = useState([]);
  const navigate = useNavigate();

  const handlePerguntaSubmit = async (e) => {
    e.preventDefault();

    if (!pergunta.trim()) {
      alert('Digite a pergunta antes de enviar.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/cadastrar-pergunta`, {
        pergunta,
      });
      const id = response.data.id;
      setPerguntaId(id);
      alert('Pergunta adicionada! Agora adicione as respostas.');
    } catch (error) {
      console.error('Erro ao adicionar pergunta:', error);
      alert('Erro ao adicionar pergunta.');
    }
  };

  const handleRespostaSubmit = async (e) => {
    e.preventDefault();

    if (!resposta.trim()) {
      alert('Digite uma resposta antes de enviar.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/cadastrar-resposta/${perguntaId}`, {
        resposta,
      });
      setRespostasAdicionadas([...respostasAdicionadas, resposta]);
      setResposta('');
    } catch (error) {
      console.error('Erro ao adicionar resposta:', error);
      alert('Erro ao adicionar resposta.');
    }
  };

  return (
    <div className="faq-page">
      <h1>Adicionar FAQ</h1>

      {!perguntaId && (
        <form className="contato-form" onSubmit={handlePerguntaSubmit}>
          <label htmlFor="pergunta">Pergunta</label>
          <textarea
            id="pergunta"
            name="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            required
          />
          <button type="submit" className="btn-green">
            Adicionar Pergunta
          </button>
        </form>
      )}

      {perguntaId && (
        <form className="contato-form" onSubmit={handleRespostaSubmit}>
          <label htmlFor="resposta">Adicionar Resposta</label>
          <textarea
            id="resposta"
            name="resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
          />
          <button type="submit" className="btn-green">
            Adicionar Resposta
          </button>

          {respostasAdicionadas.length > 0 && (
            <ul style={{ marginTop: '15px' }}>
              <strong>Respostas adicionadas:</strong>
              {respostasAdicionadas.map((r, index) => (
                <li key={index}>{r}</li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="btn-blue"
            style={{ marginTop: '20px' }}
            onClick={() => navigate('/sucesso')}
          >
            Finalizar
          </button>
        </form>
      )}
    </div>
  );
};

export default FaqAdicionarPage;
