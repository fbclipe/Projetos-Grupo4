import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/eventos';


const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    data: '',
    link: '',
    parceiros: '',
  });

  // Buscar todos eventos do backend
  const getEventos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listar`);
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventos();
  }, []);

  // Manipula as mudanças do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia novo evento para o backend
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.titulo ||
    !form.descricao ||
    !form.data ||
    !form.link ||
    !form.parceiros
  ) {
    alert('Preencha todos os campos');
    return;
  }

  const eventoParaEnviar = {
    ...form,
    data: form.data,
  };

  try {
    await axios.post(`${API_BASE_URL}/cadastrar`, eventoParaEnviar);

    // Limpa o formulário
    setForm({
      titulo: '',
      descricao: '',
      data: '',
      link: '',
      parceiros: '',
    });

    // Redireciona para a página de sucesso
    navigate('/sucesso');
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    alert('Erro ao adicionar evento');
  }
};

  // Deletar evento
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/deletar/${id}`);
      setEventos(eventos.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      alert('Erro ao deletar evento');
    }
  };

  if (loading) return <div>Carregando eventos...</div>;

  return (
    <div className="about-page">
      <h1>Eventos</h1>

      <form className="contato-form" onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />

        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
        />

        <label htmlFor="link">Link</label>
        <input
          id="link"
          name="link"
          value={form.link}
          onChange={handleChange}
          required
        />

        <label htmlFor="parceiros">Parceiros</label>
        <input
          id="parceiros"
          name="parceiros"
          value={form.parceiros}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-green">
          Adicionar Evento
        </button>
      </form>

      <ul className="page-list">
        {eventos.length === 0 && <li>Nenhum evento cadastrado.</li>}

        {eventos.map((evento) => (
          <li key={evento.id} style={{ marginBottom: '15px' }}>
            <strong>Título:</strong> {evento.titulo} <br />
            <strong>Descrição:</strong> {evento.descricao} <br />
            <strong>Data:</strong> {evento.data} <br />
            <strong>Link:</strong>{' '}
            <a href={evento.link} target="_blank" rel="noreferrer">
              {evento.link}
            </a>
            <br />
            <strong>Parceiros:</strong> {evento.parceiros}
            <br />
            <button
              className="btn-red"
              style={{ marginTop: '8px' }}
              onClick={() => handleDelete(evento.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventosPage;
