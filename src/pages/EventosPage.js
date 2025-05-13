// src/pages/EventosPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEventos } from '../services/eventosService';

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ titulo: '', data: '' });

  useEffect(() => {
    getEventos().then(data => {
      setEventos(data);
      setLoading(false);
    });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setEventos([form, ...eventos]);
    setForm({ titulo: '', data: '' });
  };

  if (loading) return <div className="loading">Carregando eventos...</div>;

  return (
    <div className="about-page">
      <h1>Eventos</h1>
      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" value={form.titulo} onChange={handleChange} required />
        <label htmlFor="data">Data</label>
        <input type="date" id="data" name="data" value={form.data} onChange={handleChange} required />
        <button type="submit">Adicionar Evento</button>
      </form>
      <ul className="page-list">
        {eventos.map((e, idx) => (
          <motion.li
            className="motion-list-item"
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>Título:</strong> {e.titulo} <strong>Data:</strong> {e.data}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default EventosPage;
