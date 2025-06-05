// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import brasfiLogo from '../pages/brasfi-02.png'; // Importe o logo também para o layout admin

const AdminLayout = () => {
  return (
    <>
      <header className="header"> {/* Use a mesma classe de estilo do MainLayout */}
        <nav className="nav-container"> {/* Use a mesma classe de estilo do MainLayout */}
          <img
            src={brasfiLogo}
            alt="Logo da Brasfi"
            style={{ maxWidth: '45px', height: 'auto', marginRight: '20px' }}
          />
          <ul className="nav-list"> {/* Use a mesma classe de estilo para a lista */}
            {/* LINKS ESPECÍFICOS DA ADMINISTRAÇÃO */}
            <li><Link to="/homeadm" className="admin-nav-link">Dashboard Admin</Link></li>
            <li><Link to="/homeadm/faqs" className="admin-nav-link">Gerenciar FAQs</Link></li>
            <li><Link to="/homeadm/usuarios" className="admin-nav-link">Gerenciar Usuários</Link></li>
            <li><Link to="/homeadm/noticias" className="admin-nav-link">Gerenciar Notícias</Link></li>
            <li><Link to="/homeadm/eventos" className="admin-nav-link">Gerenciar Eventos</Link></li>
            {/* Adicione mais links de navegação para a área admin aqui */}
            
            {/* Link para voltar ao site principal - importante! */}
            <li><Link to="/" className="admin-logout-link">Voltar ao Site</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content"> {/* Use a mesma classe de estilo do MainLayout */}
        <Outlet /> {/* Aqui é onde o conteúdo da rota aninhada (HomeadmPage, FaqAdicionarPage, etc.) será renderizado */}
      </main>

      <footer className="footer"> {/* Use a mesma classe de estilo do MainLayout */}
        <p>&copy; {new Date().getFullYear()} Brasfi Admin - Todos os direitos reservados.</p>
      </footer>
    </>
  );
};

export default AdminLayout;