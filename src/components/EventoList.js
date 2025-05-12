import React, { useState, useEffect } from 'react';
import './Evento.css';

export default function EventoList() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({ titulo:'', descricao:'', data:'', link:'', parceiros:'' });
  const [editingId, setEditingId] = useState(null);
  const [detail, setDetail]     = useState(null);

  useEffect(() => {
    fetch('/api/eventos/listar')
      .then(res => res.json())
      .then(setEventos);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url    = editingId
      ? `/api/eventos/atualizar/${editingId}`
      : '/api/eventos/criar';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(() => {
      setForm({ titulo:'', descricao:'', data:'', link:'', parceiros:'' });
      setEditingId(null);
      return fetch('/api/eventos/listar');
    })
    .then(res => res.json())
    .then(setEventos);
  };

  const handleEdit = e => {
    setForm({ titulo:e.nome, descricao:e.descricao, data:e.data, link:e.link, parceiros:e.parceiros });
    setEditingId(e.id);
  };

  const handleDelete = id =>
    fetch(`/api/eventos/deletar/${id}`, { method:'DELETE' })
      .then(() => setEventos(ev => ev.filter(x => x.id !== id)));

  const handleView = id =>
    fetch(`/api/eventos/buscar/${id}`)
      .then(res => res.json())
      .then(setDetail);

  return (
    <div className="card evento-container">
      <h2>Eventos</h2>
      <form className="form evento-form" onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={form.titulo}
          onChange={e => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          type="date"
          value={form.data}
          onChange={e => setForm({ ...form, data: e.target.value })}
        />
        <input
          placeholder="Parceiros"
          value={form.parceiros}
          onChange={e => setForm({ ...form, parceiros: e.target.value })}
        />
        <button className="btn" type="submit">
          {editingId ? 'Salvar' : 'Adicionar'}
        </button>
      </form>

      <div className="evento-list">
        {eventos.map(e => (
          <div key={e.id} className="card evento-card">
            <h3>{e.nome}</h3>
            <p>{e.descricao}</p>
            <div className="btn-group">
              <button className="btn" onClick={() => handleEdit(e)}>Editar</button>
              <button className="btn" onClick={() => handleView(e.id)}>Ver</button>
              <button className="btn" onClick={() => handleDelete(e.id)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div className="card evento-detail">
          <h3>Detalhes</h3>
          <p><strong>Título:</strong> {detail.nome}</p>
          <p><strong>Data:</strong> {detail.data}</p>
          <p><strong>Parceiros:</strong> {detail.parceiros}</p>
          <p><a href={detail.link} target="_blank" rel="noopener noreferrer">Link</a></p>
        </div>
      )}
    </div>
);
}
