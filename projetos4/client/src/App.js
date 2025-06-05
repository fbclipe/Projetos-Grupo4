import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomeadmPage from './pages/HomeadmPage';
import FaqAdicionarPage from './pages/FaqadicionarPage';
import GerenciarEventosPage from './pages/GerenciarEventosPage';
import GerenciarNoticiasPage from './pages/GerenciarNoticiasPage';

function App() {
  return (
    <Router>

      {/* Conteúdo principal e rotas */}
      <main className="main-content">
        <Routes>
          {/* Rotas públicas do site */}
          <Route path="/" element={<MainLayout />}>
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
          </Route>

          {/* Rotas da área de administração, aninhadas sob o AdminLayout */}
          <Route path="/homeadm" element={<AdminLayout />}>
            <Route index element={<HomeadmPage />} /> 
            <Route path="faqs" element={<FaqAdicionarPage />} /> 
            <Route path="eventos" element={<GerenciarEventosPage />} />
            <Route path="noticias" element={<GerenciarNoticiasPage />} />
          </Route>

          {/* Rota de fallback para 404 (opcional) */}
          {/* <Route path="*" element={<div>Página não encontrada</div>} /> */}
        </Routes>
      </main>

    </Router>
  );
}

export default App;
