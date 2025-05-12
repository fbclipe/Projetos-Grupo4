import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Bem-vindo à Brasfi</h1>
          <p className="tagline">Monitoramento de acessos e gestão de contribuintes e eventos</p>
          <a href="/#features" className="btn hero-btn">Saiba mais</a>
        </div>
      </section>

      <div className="container" id="features">
        <div className="card feature-card">
          <h3>Gestão de Acessos</h3>
          <p>Registre e monitore acessos em tempo real com segurança e confiabilidade.</p>
        </div>
        <div className="card feature-card">
          <h3>Contribuintes</h3>
          <p>Cadastre, autentique e gerencie contribuintes com facilidade.</p>
        </div>
        <div className="card feature-card">
          <h3>Eventos</h3>
          <p>Crie, edite e visualize eventos em uma interface intuitiva.</p>
        </div>
      </div>
    </>
  );
}
