import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/noticias';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    titulo: '',
    conteudo: '',
  });

  // Busca notícias do backend
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

  // Manipula mudança do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia a notícia para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.conteudo) {
      alert('Preencha todos os campos');
      return;
    }

    const noticiaParaEnviar = {
      titulo: form.titulo,
      conteudo: form.conteudo,
    };

    try {
      const response = await axios.post(API_BASE_URL, noticiaParaEnviar);
      setNoticias([response.data, ...noticias]);
      setForm({ titulo: '', conteudo: '' });
    } catch (error) {
      console.error('Erro ao adicionar notícia:', error);
      alert('Erro ao adicionar notícia');
    }
  };

  // Deleta notícia
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir essa notícia?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setNoticias(noticias.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
      alert('Erro ao deletar notícia');
    }
  };

  if (loading) return <div className="loading">Carregando notícias...</div>;

  return (
    <div className="about-page">
      <h1>Notícias</h1>

      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="conteudo">Conteúdo</label>
        <textarea
          id="conteudo"
          name="conteudo"
          value={form.conteudo}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-green">
          Adicionar Notícia
        </button>
      </form>

      <ul className="page-list">
        {noticias.length === 0 && <li>Nenhuma notícia cadastrada.</li>}

        {noticias.map((n) => (
          <motion.li
            className="motion-list-item"
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>Título:</strong> {n.titulo}
            <br />
            <strong>Conteúdo:</strong> {n.conteudo}
            <br />
            <strong>Data:</strong>{' '}
            {new Date(n.dataPublicacao).toLocaleDateString('pt-BR')}
            <br />
            <button
              className="btn-red"
              onClick={() => handleDelete(n.id)}
              style={{ marginTop: '8px' }}
            >
              Excluir
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default NoticiasPage;
