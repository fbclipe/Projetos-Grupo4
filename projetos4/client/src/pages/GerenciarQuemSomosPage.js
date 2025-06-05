// src/pages/GerenciarQuemSomosPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import { getMembros, addMembro, deleteMembro } from '../services/quemSomosService';

const GerenciarQuemSomosPage = () => {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    foto: null,
  });
  const fotoInputRef = useRef(null);

  const navigate = useNavigate(); // Inicialize useNavigate

  useEffect(() => {
    fetchMembros();
  }, []);

  const fetchMembros = async () => {
    try {
      const data = await getMembros();
      setMembros(data);
    } catch (error) {
      // Erro já logado no service
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setForm({ ...form, foto: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.cargo || !form.foto) {
      alert('Por favor, preencha todos os campos e selecione uma foto.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('cargo', form.cargo);
    formData.append('foto', form.foto);

    try {
      await addMembro(formData);
      alert('Membro adicionado com sucesso!');
      // *** MUDANÇA AQUI: REDIRECIONAR PARA A PÁGINA DE SUCESSO ***
      navigate('/sucesso'); 

      // As linhas abaixo (limpar form e fetchMembros) NÃO SÃO MAIS NECESSÁRIAS
      // se você está redirecionando, pois a página será recarregada.
      /*
      setForm({ nome: '', cargo: '', foto: null });
      if (fotoInputRef.current) {
        fotoInputRef.current.value = '';
      }
      fetchMembros();
      */
    } catch (error) {
      // Erro já logado no service
      alert('Erro ao adicionar membro.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await deleteMembro(id);
        alert('Membro excluído com sucesso!');
        fetchMembros(); // Mantém a atualização da lista após a exclusão
      } catch (error) {
        // Erro já logado no service
        alert('Erro ao excluir membro.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando gerenciador "Quem Somos"...</div>;
  }

  return (
    <div className="admin-page" style={{ padding: '20px' }}>
      <h1>Gerenciar "Quem Somos"</h1>

      <h2>Adicionar Novo Membro</h2>
      <form
        className="admin-form"
        onSubmit={handleSubmit}
        style={{ marginBottom: '30px', ...formStyles.form }}
      >
        <label htmlFor="nome" style={formStyles.label}>Nome:</label>
        <input
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          placeholder="Nome do membro"
          style={formStyles.input}
        />

        <label htmlFor="cargo" style={formStyles.label}>Cargo:</label>
        <input
          id="cargo"
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
          required
          placeholder="Cargo do membro"
          style={formStyles.input}
        />

        <label htmlFor="foto" style={formStyles.label}>Foto:</label>
        <input
          type="file"
          id="foto"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          required
          ref={fotoInputRef}
          style={formStyles.input}
        />

        <button
          type="submit"
          style={formStyles.submitButton}
        >
          Adicionar Membro
        </button>
      </form>

      <h2 style={{ marginTop: '40px' }}>Membros Cadastrados</h2>
      {membros.length === 0 ? (
        <p>Nenhum membro cadastrado. Adicione um acima!</p>
      ) : (
        <ul
          className="admin-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {membros.map((membro) => (
            <li
              key={membro.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <strong>Nome:</strong> {membro.nome}
              <br />
              <strong>Cargo:</strong> {membro.cargo}
              <br />
              {membro.fotoBase64 && (
                <img
                  src={`data:image/jpeg;base64,${membro.fotoBase64}`}
                  alt={membro.nome}
                  style={{
                    width: '150px',
                    borderRadius: '8px',
                    marginTop: '8px',
                    objectFit: 'cover',
                  }}
                />
              )}

              <button
                onClick={() => handleDelete(membro.id)}
                style={listStyles.deleteButton}
                title="Excluir membro"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Reusing general admin styles for consistency
const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '600px',
    margin: '20px auto',
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
  deleteButton: {
    marginTop: '15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    alignSelf: 'stretch',
    transition: 'background-color 0.3s ease',
  },
};

export default GerenciarQuemSomosPage;