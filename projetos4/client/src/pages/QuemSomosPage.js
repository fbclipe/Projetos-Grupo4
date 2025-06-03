import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const QuemSomosPage = () => {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    foto: null,
  });

  const fotoInputRef = useRef(null); // Ref para input de arquivo

  const API_BASE_URL = 'http://localhost:8080/quemsomos';

  useEffect(() => {
    getMembros();
  }, []);

  const getMembros = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/findall`);
      setMembros(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
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

    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('cargo', form.cargo);
    formData.append('foto', form.foto);

    try {
      await axios.post(API_BASE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm({ nome: '', cargo: '', foto: null });
      if (fotoInputRef.current) {
        fotoInputRef.current.value = ''; // resetar input de arquivo
      }
      getMembros();
      alert('Membro adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      alert('Erro ao adicionar membro');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        getMembros();
        alert('Membro excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir membro:', error);
        alert('Erro ao excluir membro');
      }
    }
  };

  if (loading) return <div className="loading">Carregando membros...</div>;

  return (
    <div className="about-page" style={{ padding: '20px' }}>
      <h1>Quem somos</h1>

      <form
        className="contato-form"
        onSubmit={handleSubmit}
        style={{ marginBottom: '30px' }}
      >
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          placeholder="Nome do membro"
        />

        <label htmlFor="cargo">Cargo</label>
        <input
          id="cargo"
          name="cargo"
          value={form.cargo}
          onChange={handleChange}
          required
          placeholder="Cargo do membro"
        />

        <label htmlFor="foto">Foto</label>
        <input
          type="file"
          id="foto"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          required
          ref={fotoInputRef} // adiciona a ref aqui
        />

        <button
          type="submit"
          style={{
            marginTop: '15px',
            backgroundColor: '#198754',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Adicionar Membro
        </button>
      </form>

      <ul
        className="page-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          padding: 0,
          listStyle: 'none',
        }}
      >
        {membros.map((membro) => (
          <motion.li
            className="motion-list-item"
            key={membro.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
              style={{
                marginTop: '15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                alignSelf: 'stretch',
              }}
              title="Excluir membro"
            >
              Excluir
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default QuemSomosPage;
