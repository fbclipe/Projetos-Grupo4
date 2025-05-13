// src/pages/DepoimentosPage.js
import React from 'react';

const depoimentos = [
  { id: 1, nome: 'Carlos Pereira', texto: 'A solução da Brasfi transformou nossa operação. Extremamente confiável!' },
  { id: 2, nome: 'Ana Souza', texto: 'Excelente suporte e plataforma intuitiva. Recomendo a todas as empresas.' },
];

const DepoimentosPage = () => (
  <div className="depoimentos-page">
    <h1>Depoimentos</h1>
    <ul className="depoimentos-list">
      {depoimentos.map(d => (
        <li key={d.id} className="depoimento-card">
          <p>"{d.texto}"</p>
          <p><strong>- {d.nome}</strong></p>
        </li>
      ))}
    </ul>
  </div>
);

export default DepoimentosPage;
