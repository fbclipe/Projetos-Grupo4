import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getNoticias } from '../services/noticiasService';

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    titulo: '',
    conteudo: '',
    dataPublicacao: '',
  });

  useEffect(() => {
    getNoticias().then(data => {
      setNoticias(data);
      setLoading(false);
    });
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setNoticias([form, ...noticias]);
    setForm({ titulo: '', conteudo: '', dataPublicacao: '' });
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

        <label htmlFor="dataPublicacao">Data</label>
        <input
          type="date"
          id="dataPublicacao"
          name="dataPublicacao"
          value={form.dataPublicacao}
          onChange={handleChange}
          required
        />

        <button type="submit">Adicionar Notícia</button>
      </form>

      <ul className="page-list">
        {noticias.map((n, idx) => (
          <motion.li
            className="motion-list-item"
            key={idx}
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
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default NoticiasPage;
