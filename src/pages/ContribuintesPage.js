// src/pages/ContribuintesPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getContribuintes } from '../services/contribuinteService';

const ContribuintesPage = () => {
  const [contribuintes, setContribuintes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', tipo: '' });

  useEffect(() => {
    getContribuintes().then(data => {
      setContribuintes(data);
      setLoading(false);
    });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setContribuintes([form, ...contribuintes]);
    setForm({ nome: '', tipo: '' });
  };

  if (loading) return <div className="loading">Carregando contribuintes...</div>;

  return (
    <div className="about-page">
      <h1>Contribuintes</h1>
      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
        <label htmlFor="tipo">Tipo</label>
        <input id="tipo" name="tipo" value={form.tipo} onChange={handleChange} required />
        <button type="submit">Adicionar Contribuinte</button>
      </form>
      <ul className="page-list">
        {contribuintes.map((c, idx) => (
          <motion.li
            className="motion-list-item"
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>Nome:</strong> {c.nome} <strong>Tipo:</strong> {c.tipo}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ContribuintesPage;
