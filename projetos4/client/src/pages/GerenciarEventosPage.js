// src/pages/GerenciarEventosPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Needed for redirection after adding

const API_BASE_URL = 'http://localhost:8080/api/eventos';

const GerenciarEventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null, // Add ID for editing
    titulo: '',
    descricao: '',
    data: '',
    link: '',
    parceiros: '',
  });
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  const navigate = useNavigate(); // For redirection

  // Fetch all events from the backend
  const getEventos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listar`);
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      // Handle error gracefully, maybe show a message to the admin
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventos();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new or updated event to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.titulo ||
      !form.descricao ||
      !form.data ||
      !form.link ||
      !form.parceiros
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const eventData = {
      titulo: form.titulo,
      descricao: form.descricao,
      data: form.data, // Make sure date format matches backend expectation (YYYY-MM-DD)
      link: form.link,
      parceiros: form.parceiros,
    };

    try {
      if (isEditing && form.id) {
        // Update existing event
        await axios.put(`${API_BASE_URL}/atualizar/${form.id}`, eventData);
        alert('Evento atualizado com sucesso!');
      } else {
        // Add new event
        await axios.post(`${API_BASE_URL}/cadastrar`, eventData);
        alert('Evento adicionado com sucesso!');
        // Redirect to a success page or refresh the list if needed
        navigate('/sucesso'); // Or refresh the event list: getEventos();
      }

      // Clear the form and reset state
      setForm({
        id: null,
        titulo: '',
        descricao: '',
        data: '',
        link: '',
        parceiros: '',
      });
      setIsEditing(false);
      getEventos(); // Refresh the list to show changes
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento. Verifique o console para mais detalhes.');
    }
  };

  // Populate form for editing
  const handleEdit = (evento) => {
    setForm({
      id: evento.id,
      titulo: evento.titulo,
      descricao: evento.descricao,
      data: evento.data, // Ensure this format works with type="date" input
      link: evento.link,
      parceiros: evento.parceiros,
    });
    setIsEditing(true);
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento? Esta ação é irreversível!')) return;

    try {
      await axios.delete(`${API_BASE_URL}/deletar/${id}`);
      setEventos(eventos.filter((e) => e.id !== id));
      alert('Evento excluído com sucesso!');
      // If the deleted event was being edited, clear the form
      if (form.id === id) {
        setForm({ id: null, titulo: '', descricao: '', data: '', link: '', parceiros: '' });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      alert('Erro ao deletar evento.');
    }
  };

  if (loading) {
    return <div>Carregando gerenciador de eventos...</div>;
  }

  return (
    <div className="admin-page"> {/* Consider a specific class for admin pages */}
      <h1>Gerenciar Eventos</h1>

      <h2>{isEditing ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
      <form className="admin-form" onSubmit={handleSubmit} style={formStyles.form}>
        <label htmlFor="titulo" style={formStyles.label}>Título:</label>
        <input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <label htmlFor="descricao" style={formStyles.label}>Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
          style={formStyles.textarea}
        />

        <label htmlFor="data" style={formStyles.label}>Data:</label>
        <input
          type="date"
          id="data"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <label htmlFor="link" style={formStyles.label}>Link:</label>
        <input
          id="link"
          name="link"
          value={form.link}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <label htmlFor="parceiros" style={formStyles.label}>Parceiros:</label>
        <input
          id="parceiros"
          name="parceiros"
          value={form.parceiros}
          onChange={handleChange}
          required
          style={formStyles.input}
        />

        <button type="submit" style={formStyles.submitButton}>
          {isEditing ? 'Atualizar Evento' : 'Adicionar Evento'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => {
            setForm({ id: null, titulo: '', descricao: '', data: '', link: '', parceiros: '' });
            setIsEditing(false);
          }} style={formStyles.cancelButton}>
            Cancelar Edição
          </button>
        )}
      </form>

      <h2 style={{ marginTop: '40px' }}>Eventos Cadastrados</h2>
      {eventos.length === 0 ? (
        <p>Nenhum evento cadastrado. Adicione um acima!</p>
      ) : (
        <ul className="admin-list" style={listStyles.list}>
          {eventos.map((evento) => (
            <li key={evento.id} style={listStyles.listItem}>
              <div>
                <strong>Título:</strong> {evento.titulo} <br />
                <strong>Descrição:</strong> {evento.descricao} <br />
                <strong>Data:</strong> {evento.data} <br />
                <strong>Link:</strong>{' '}
                <a href={evento.link} target="_blank" rel="noreferrer">
                  {evento.link}
                </a>
                <br />
                <strong>Parceiros:</strong> {evento.parceiros}
              </div>
              <div style={listStyles.buttonContainer}>
                <button
                  style={listStyles.editButton}
                  onClick={() => handleEdit(evento)}
                >
                  Editar
                </button>
                <button
                  style={listStyles.deleteButton}
                  onClick={() => handleDelete(evento.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Basic inline styles for the form and list (consider moving to CSS file)
const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '600px',
    // CHANGE HERE: Centralize the form horizontally
    margin: '20px auto', // '20px' for top/bottom, 'auto' for left/right to center
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    minHeight: '80px',
    resize: 'vertical',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  }
};

const listStyles = {
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow content to wrap on smaller screens
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px', // Add margin for smaller screens
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
};

export default GerenciarEventosPage;