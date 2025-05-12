import React, { useState } from 'react';
import './Auth.css';

export default function ContribuintesLoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: autenticar via API
    console.log('Login Contribuinte', email, senha);
  };

  return (
    <div className="auth-container">
      <h2>Login Contribuintes</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}
