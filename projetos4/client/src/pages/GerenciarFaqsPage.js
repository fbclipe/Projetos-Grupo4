// src/pages/GerenciarFaqsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/faqs'; // Verifique se esta URL está correta

const GerenciarFaqsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perguntaForm, setPerguntaForm] = useState({
    pergunta: '',
  });
  const [respostaForm, setRespostaForm] = useState({
    resposta: '',
    perguntaId: null, // O ID da pergunta pai selecionada no dropdown
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Busca todas as FAQs (perguntas e suas respostas)
  const getFaqs = async () => {
    try {
      setLoading(true);
      const perguntasResponse = await axios.get(`${API_BASE_URL}/perguntas`);
      const perguntas = perguntasResponse.data;

      const faqsComRespostas = await Promise.all(
        perguntas.map(async (pergunta) => {
          try {
            const respostasResponse = await axios.get(`${API_BASE_URL}/respostas/${pergunta.id}`);
            return { ...pergunta, respostas: respostasResponse.data };
          } catch (error) {
            console.error(`Erro ao buscar respostas para a pergunta ${pergunta.id}:`, error);
            return { ...pergunta, respostas: [] };
          }
        })
      );
      setFaqs(faqsComRespostas);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      setMessage('Erro ao carregar FAQs.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  // Lida com mudanças nos inputs do formulário de pergunta
  const handlePerguntaChange = (e) => {
    setPerguntaForm({ ...perguntaForm, [e.target.name]: e.target.value });
  };

  // Lida com mudanças nos inputs do formulário de resposta
  const handleRespostaChange = (e) => {
    setRespostaForm({ ...respostaForm, [e.target.name]: e.target.value });
  };

  // Envia nova pergunta
  const handlePerguntaSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!perguntaForm.pergunta.trim()) {
      setMessage('A pergunta não pode ser vazia!');
      setMessageType('error');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/pergunta`, { pergunta: perguntaForm.pergunta });
      setMessage('Pergunta adicionada com sucesso!');

      setMessageType('success');
      setPerguntaForm({ pergunta: '' });
      getFaqs();
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao salvar pergunta:', error);
      const backendErrorMessage = error.response?.data?.message || error.message;
      setMessage(`Erro ao salvar pergunta: ${backendErrorMessage}. Verifique o console.`);
      setMessageType('error');
    }
  };

  // Envia nova resposta
  const handleRespostaSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!respostaForm.resposta.trim() || !respostaForm.perguntaId) {
      setMessage('A resposta e a pergunta associada não podem ser vazias!');
      setMessageType('error');
      return;
    }

    const respostaData = {
      resposta: respostaForm.resposta,
      perguntaPai: { id: respostaForm.perguntaId }
    };

    try {
      await axios.post(`${API_BASE_URL}/resposta`, respostaData);
      setMessage('Resposta adicionada com sucesso!');

      setMessageType('success');
      setRespostaForm({ resposta: '', perguntaId: null });
      getFaqs();
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
      const backendErrorMessage = error.response?.data?.message || error.message;
      setMessage(`Erro ao salvar resposta: ${backendErrorMessage}. Verifique o console.`);
      setMessageType('error');
    }
  };

  // Funções de exclusão de perguntas e respostas foram removidas
  // handleDeletePergunta e handleDeleteResposta não existem mais aqui.

  if (loading) {
    return <div>Carregando gerenciador de FAQs...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Gerenciar FAQs</h1>

      {message && (
        <div style={messageType === 'success' ? messageStyles.success : messageStyles.error}>
          {message}
        </div>
      )}

      {/* Formulário para Adicionar Perguntas */}
      <h2>Adicionar Nova Pergunta</h2>
      <form className="admin-form" onSubmit={handlePerguntaSubmit} style={formStyles.form}>
        <label htmlFor="pergunta" style={formStyles.label}>Pergunta:</label>
        <textarea
          id="pergunta"
          name="pergunta"
          value={perguntaForm.pergunta}
          onChange={handlePerguntaChange}
          required
          style={formStyles.textarea}
        />
        <button type="submit" style={formStyles.submitButton}>
          Adicionar Pergunta
        </button>
      </form>

      {/* Formulário para Adicionar Respostas */}
      <h2>Adicionar Resposta a uma Pergunta Existente</h2>
      <form className="admin-form" onSubmit={handleRespostaSubmit} style={formStyles.form}>
        <label htmlFor="perguntaSelect" style={formStyles.label}>Associar à Pergunta:</label>
        <select
          id="perguntaSelect"
          name="perguntaId"
          value={respostaForm.perguntaId || ''}
          onChange={(e) => setRespostaForm({ ...respostaForm, perguntaId: e.target.value })}
          required
          style={formStyles.select}
        >
          <option value="">Selecione uma Pergunta</option>
          {faqs.map((faq) => (
            <option key={faq.id} value={faq.id}>{faq.pergunta}</option>
          ))}
        </select>

        <label htmlFor="resposta" style={formStyles.label}>Resposta:</label>
        <textarea
          id="resposta"
          name="resposta"
          value={respostaForm.resposta}
          onChange={handleRespostaChange}
          required
          style={formStyles.textarea}
        />
        <button type="submit" style={formStyles.submitButton}>
          Adicionar Resposta
        </button>
      </form>

      {/* Lista de FAQs Cadastradas (apenas exibição) */}
      <h2 style={{ marginTop: '40px' }}>FAQs Cadastradas</h2>
      {faqs.length === 0 ? (
        <p>Nenhuma FAQ cadastrada. Adicione uma pergunta acima!</p>
      ) : (
        <ul className="admin-list" style={listStyles.list}>
          {faqs.map((faq) => (
            <li key={faq.id} style={listStyles.listItem}>
              <div>
                <strong>Pergunta:</strong> {faq.pergunta}
                {/* Botão de Excluir Pergunta removido */}
              </div>
              {faq.respostas.length === 0 ? (
                <p style={{ marginLeft: '20px', fontStyle: 'italic', color: '#666' }}>Sem respostas ainda.</p>
              ) : (
                <ul style={{ ...listStyles.list, marginLeft: '20px', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
                  {faq.respostas.map((r) => (
                    <li key={r.id} style={{ ...listStyles.subListItem, marginBottom: '5px' }}>
                      <span>- {r.resposta}</span>
                      {/* Botão de Excluir Resposta removido */}
                    </li>
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

// Estilos (inalterados, mas necessários para o componente)
const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    minHeight: '80px',
    resize: 'vertical',
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  }
};

const listStyles = {
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  subListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: { // Mantido, mas não usado
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  editButton: { // Mantido, mas não usado
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: { // Mantido, mas não usado
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
  editButtonSmall: { // Mantido, mas não usado
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.8em',
  },
  deleteButtonSmall: { // Mantido, mas não usado
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.8em',
  },
};

const messageStyles = {
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default GerenciarFaqsPage;