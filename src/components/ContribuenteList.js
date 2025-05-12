import React, { useState, useEffect } from 'react';
import './Contribuente.css';

export default function ContribuenteList() {
  const [contribuintes, setContribuintes] = useState([]);
  const [form, setForm] = useState({ nome: '', tipoContribuinte: '' });
  const [editingId, setEditingId] = useState(null);
  const [detail, setDetail] = useState(null);

  const fetchList = () => {
    fetch('/api/contribuentes/listar')
      .then(res => res.json())
      .then(setContribuintes);
  };

  useEffect(fetchList, []);

  const handleView = id => {
    fetch(`/api/contribuentes/buscar/${id}`)
      .then(res => res.json())
      .then(setDetail);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `/api/contribuentes/atualizar/${editingId}`
      : '/api/contribuentes/cadastrar';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(() => {
        setForm({ nome: '', tipoContribuinte: '' });
        setEditingId(null);
        fetchList();
      });
  };

  const handleEdit = item => {
    setForm({ nome: item.nome, tipoContribuinte: item.tipoContribuinte });
    setEditingId(item.id);
    setDetail(null);
  };

  const handleDelete = id => {
    fetch(`/api/contribuentes/deletar/${id}`, { method: 'DELETE' })
      .then(fetchList);
  };

  return (
    <div className="contribuente-container">
      <h2>Contribuintes</h2>
      {detail && (
        <div className="contribuente-detail">
          <h3>Detalhes do Contribuinte</h3>
          <p>Nome: {detail.nome}</p>
          <p>Tipo: {detail.tipoContribuinte}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="contribuente-form">
        <input
          className="input-nome"
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />
        <select
          name="tipoContribuinte"
          value={form.tipoContribuinte}
          onChange={e => setForm({ ...form, tipoContribuinte: e.target.value })}
          required
        >
          <option value="">Selecione</option>
          <option value="Pessoa">Pessoa</option>
          <option value="Empresa">Empresa</option>
          <option value="Serviço">Serviço</option>
        </select>
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <div className="contribuente-list">
        {contribuintes.map(c => (
          <div key={c.id} className="contribuente-card">
            <h3>{c.nome}</h3>
            <p>{c.tipoContribuinte}</p>
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => handleView(c.id)}>Ver</button>
            <button onClick={() => handleDelete(c.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
);
}
