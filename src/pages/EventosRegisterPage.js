import React, { useState } from 'react';
import './Auth.css';

export default function EventosRegisterPage() {
  const [form, setForm] = useState({ nome: '', data: '', parceiros: '' });

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: registrar via API
    console.log('Register Evento', form);
  };

  return (
    <div className="auth-container">
      <h2>Cadastro Eventos</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título do Evento"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Data"
          value={form.data}
          onChange={e => setForm({ ...form, data: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Parceiros"
          value={form.parceiros}
          onChange={e => setForm({ ...form, parceiros: e.target.value })}
          required
        />
        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
