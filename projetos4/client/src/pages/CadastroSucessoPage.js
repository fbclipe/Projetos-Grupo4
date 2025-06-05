import React from 'react';
import { Link } from 'react-router-dom';
import './sucesso.css';

function CadastroSucessoPage() {
  return (
    <div className="sucesso-container">
      <h1>Cadastrado realizado com sucesso!</h1>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default CadastroSucessoPage;
