// src/pages/GerenciarNoticiasPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/noticias';

const GerenciarNoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    titulo: '',
    conteudo: '',
  });

  const navigate = useNavigate();

  const getNoticias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/findall`);
      setNoticias(response.data);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNoticias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.conteudo) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const noticiaData = {
      titulo: form.titulo,
      conteudo: form.conteudo,
    };

    try {
      await axios.post(API_BASE_URL, noticiaData);
      alert('Notícia adicionada com sucesso!');
      
      // *** MUDANÇA AQUI: REDIRECIONAR PARA A PÁGINA DE SUCESSO ***
      navigate('/sucesso'); 

      // As linhas abaixo (limpar form e getNoticias) NÃO SÃO MAIS NECESSÁRIAS
      // se você está redirecionando, pois a página será recarregada.
      /*
      setForm({
        titulo: '',
        conteudo: '',
      });
      getNoticias();
      */
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
      alert('Erro ao salvar notícia. Verifique o console para mais detalhes.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir essa notícia? Esta ação é irreversível!')) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setNoticias(noticias.filter((n) => n.id !== id));
      alert('Notícia excluída com sucesso!');
      setForm({ titulo: '', conteudo: '' }); // Limpa o formulário apenas se necessário
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
      alert('Erro ao deletar notícia.');
    }
  };

  if (loading) {
    return <div className="loading">Carregando gerenciador de notícias...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Gerenciar Notícias</h1>

      <h2>Adicionar Nova Notícia</h2>
      <form className="admin-form" onSubmit={handleSubmit} style={formStyles.form}>
        <label htmlFor="titulo" style={formStyles.label}>Título:</label>
        <input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <label htmlFor="conteudo" style={formStyles.label}>Conteúdo:</label>
        <textarea
          id="conteudo"
          name="conteudo"
          value={form.conteudo}
          onChange={handleChange}
          required
          style={formStyles.textarea}
        />

        <button type="submit" style={formStyles.submitButton}>
          Adicionar Notícia
        </button>
      </form>

      <h2 style={{ marginTop: '40px' }}>Notícias Cadastradas</h2>
      {noticias.length === 0 ? (
        <p>Nenhuma notícia cadastrada. Adicione uma acima!</p>
      ) : (
        <ul className="admin-list" style={listStyles.list}>
          {noticias.map((n) => (
            <li key={n.id} style={listStyles.listItem}>
              <div>
                <strong>Título:</strong> {n.titulo} <br />
                <strong>Conteúdo:</strong> {n.conteudo} <br />
                <strong>Data:</strong> {new Date(n.dataPublicacao).toLocaleDateString('pt-BR')}
              </div>
              <div style={listStyles.buttonContainer}>
                <button
                  style={listStyles.deleteButton}
                  onClick={() => handleDelete(n.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '600px',
    // MUDANÇA AQUI: Centralizar o formulário horizontalmente
    margin: '20px auto', // '20px' para topo/base, 'auto' para esquerda/direita para centralizar
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
};

export default GerenciarNoticiasPage;