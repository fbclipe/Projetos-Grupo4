import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicosPage from './pages/ServicosPage';
import ContribuintesPage from './pages/ContribuintesPage';
import EventosPage from './pages/EventosPage';
import DepoimentosPage from './pages/DepoimentosPage';
import ContatoPage from './pages/ContatoPage';
import FaqPage from './pages/FaqPage';
import NoticiasPage from './pages/NoticiasPage';
import QuemSomosPage from './pages/QuemSomosPage';
import CadastroSucessoPage from './pages/CadastroSucessoPage';
import brasfiLogo from './pages/brasfi-02.png';
import HomeadmPage from './pages/HomeadmPage';

function App() {
  return (
    <Router>
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
          </ul>
        </nav>
</header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quemsomos" element={<QuemSomosPage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/contribuintes" element={<ContribuintesPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/depoimentos" element={<DepoimentosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/sucesso" element={<CadastroSucessoPage />} />
          <Route path="/homeadm" element={<HomeadmPage />}/>
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brasfi - Todos os direitos reservados.</p>
      </footer>
    </Router>
  );
}

export default App;
