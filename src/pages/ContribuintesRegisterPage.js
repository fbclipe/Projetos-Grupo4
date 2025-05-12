import React, { useState } from 'react';
import './Auth.css';

export default function ContribuintesRegisterPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: registrar via API
    console.log('Register Contribuinte', form);
  };

  return (
    <div className="auth-container">
      <h2>Cadastro Contribuintes</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          required
        />
        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
