import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [user, setUser] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [message, setMessage] = useState(null);

  // Função para atualizar os inputs do formulário
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Função para enviar os dados para o backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/cadastrar', user)
      .then(response => {
        setMessage("Cadastro realizado com sucesso!");
        // Aqui você pode redirecionar o usuário ou limpar o formulário, se desejar
      })
      .catch(error => {
        setMessage("Erro no cadastro: " + error.response.data);
      });
  };

  // Estilos inline conforme solicitado:
  const containerStyle = {
    backgroundColor: '#006400',  // Verde escuro
    padding: '20px',
    borderRadius: '8px',
    color: '#fff',  // Texto em branco
    maxWidth: '400px',
    margin: '20px auto'
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '4px',
    width: '100%'
  };

  const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#FFD700', // Toque de amarelo
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Cadastro de Usuário</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={user.nome}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={user.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={user.senha}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterUser;
