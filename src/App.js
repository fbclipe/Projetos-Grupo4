import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventosPage from './pages/EventosPage';
import ContribuintesPage from './pages/ContribuintesPage';
import ContribuintesLoginPage from './pages/ContribuintesLoginPage';
import ContribuintesRegisterPage from './pages/ContribuintesRegisterPage';
import EventosLoginPage from './pages/EventosLoginPage';
import EventosRegisterPage from './pages/EventosRegisterPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <NavLink to="/" className="nav-link" end>Home</NavLink>
        <NavLink to="/eventos" className="nav-link">Eventos</NavLink>
        <NavLink to="/contribuintes" className="nav-link">Contribuintes</NavLink>
        <NavLink to="/eventos/login" className="nav-link">Login Eventos</NavLink>
        <NavLink to="/eventos/register" className="nav-link">Cadastro Eventos</NavLink>
        <NavLink to="/contribuintes/login" className="nav-link">Login Contribuintes</NavLink>
        <NavLink to="/contribuintes/register" className="nav-link">Cadastro Contribuintes</NavLink>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/contribuintes" element={<ContribuintesPage />} />
          <Route path="/eventos/login" element={<EventosLoginPage />} />
          <Route path="/eventos/register" element={<EventosRegisterPage />} />
          <Route path="/contribuintes/login" element={<ContribuintesLoginPage />} />
          <Route path="/contribuintes/register" element={<ContribuintesRegisterPage />} />
        </Routes>
      </div>
    </Router>
);
}
