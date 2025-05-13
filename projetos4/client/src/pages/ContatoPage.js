// src/pages/ContatoPage.js
import React, { useState } from 'react';

const ContatoPage = () => {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert('Obrigado pelo contato, ' + form.nome + '!');
  };

  return (
    <div className="contato-page">
      <h1>Contato</h1>
      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows="4" value={form.mensagem} onChange={handleChange} required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContatoPage;
