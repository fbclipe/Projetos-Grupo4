// src/pages/GerenciarContribuintesPage.jsx
import React, { useEffect, useState } from 'react';
// Não precisamos mais de `useNavigate` nem de `addContribuinte`
import { getContribuintes, deleteContribuinte } from '../services/contribuinteService';

const GerenciarContribuintesPage = () => {
  const [contribuintes, setContribuintes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContribuintes();
  }, []);

  const fetchContribuintes = async () => {
    try {
      const data = await getContribuintes();
      setContribuintes(data);
    } catch (error) {
      console.error('Erro ao buscar contribuintes:', error); // Log para depuração
      // Opcional: exibir uma mensagem de erro na UI
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este contribuinte? Esta ação é irreversível!')) return;

    try {
      await deleteContribuinte(id);
      alert('Contribuinte excluído com sucesso!');
      fetchContribuintes(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao deletar contribuinte:', error); // Log para depuração
      alert('Erro ao deletar contribuinte.');
    }
  };

  if (loading) {
    return <div className="loading">Carregando dados dos contribuintes...</div>;
  }

  return (
    <div className="admin-page" style={{ padding: '20px' }}>
      <h1>Lista de Contribuintes</h1>

      {contribuintes.length === 0 ? (
        <p>Nenhum contribuinte cadastrado.</p>
      ) : (
        <ul className="admin-list" style={listStyles.list}>
          {contribuintes.map((c) => (
            <li key={c.id} style={listStyles.listItem}>
              <div>
                <strong>Nome:</strong> {c.nomeCompleto}<br />
                <strong>CPF:</strong> {c.cpf}<br />
                <strong>Telefone:</strong> {c.telefone}<br />
                <strong>Endereço:</strong> {`${c.rua}, ${c.numero} - ${c.cidade}/${c.estado}`}<br />
                <strong>Formas de Doação:</strong> {Array.isArray(c.formasDeDoacao) ? c.formasDeDoacao.join(', ') : c.formasDeDoacao}<br />
                <strong>Tipo:</strong> {c.tipoContribuinte}<br />
                <strong>Frequência:</strong> {c.frequenciaPreferida}<br />
                <strong>Data da Doação:</strong> {c.dataDoacao}<br />
              </div>
              <button
                style={listStyles.deleteButton} // Estilo para o botão de exclusão
                onClick={() => handleDelete(c.id)}
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

// Estilos para a lista e o botão de exclusão
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
    justifyContent: 'space-between', // Alinha conteúdo e botão em lados opostos
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Cor vermelha para exclusão
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease',
  },
};

export default GerenciarContribuintesPage;