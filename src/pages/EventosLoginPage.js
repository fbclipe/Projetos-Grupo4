import React, { useState } from 'react';
import './Auth.css';

export default function EventosLoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: autenticar via API
    console.log('Login Evento', usuario, senha);
  };

  return (
    <div className="auth-container">
      <h2>Login Eventos</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
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
