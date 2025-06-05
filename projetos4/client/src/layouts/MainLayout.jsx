// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import brasfiLogo from '../pages/brasfi-02.png'; // Caminho relativo ao MainLayout

const MainLayout = () => {
  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <img
            src={brasfiLogo}
            alt="Logo da Brasfi"
            style={{ maxWidth: '45px', height: 'auto', marginRight: '20px' }}
          />
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quemsomos">Quem somos</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/contribuintes">Contribuintes</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/depoimentos">Depoimentos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/noticias">Notícias</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            {/* Este é o botão/link para a área administrativa */}
            <li><Link to="/homeadm" className="admin-button-link">Painel Admin</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Outlet /> {/* ESTE É ONDE O CONTEÚDO DAS PÁGINAS PÚBLICAS VAI APARECER */}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brasfi - Todos os direitos reservados.</p>
      </footer>
    </>
  );
};

export default MainLayout;