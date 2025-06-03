import React from 'react';
import { Link } from 'react-router-dom';
import './sucesso.css';

function CadastroSucessoPage() {
  return (
    <div className="sucesso-container">
      <h1>Evento cadastrado com sucesso!</h1>
      <Link to="/eventos">Voltar para os eventos</Link>
    </div>
  );
}

export default CadastroSucessoPage;
