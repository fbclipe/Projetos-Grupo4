import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SobrePage from './pages/SobrePage';
import ServicosPage from './pages/ServicosPage';
import ContribuintesPage from './pages/ContribuintesPage';
import EventosPage from './pages/EventosPage';
import DepoimentosPage from './pages/DepoimentosPage';
import ContatoPage from './pages/ContatoPage';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <Router>
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/contribuintes">Contribuintes</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/depoimentos">Depoimentos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/contribuintes" element={<ContribuintesPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/depoimentos" element={<DepoimentosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Brasfi - Todos os direitos reservados.</p>
      </footer>
    </Router>
  );
}

export default App;
