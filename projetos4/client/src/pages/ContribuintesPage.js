import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/contribuintes';

const ContribuintesPage = () => {
  const [contribuintes, setContribuintes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nomeCompleto: '',
    telefone: '',
    cpf: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    formasDeDoacao: '',
    tipoContribuinte: '',
    frequenciaPreferida: '',
    dataDoacao: '',
  });

  const getContribuintes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setContribuintes(response.data);
    } catch (error) {
      console.error('Erro ao buscar contribuintes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContribuintes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObrigatorios = [
      'nomeCompleto', 'telefone', 'cpf', 'estado',
      'cidade', 'rua', 'numero', 'formasDeDoacao',
      'tipoContribuinte', 'frequenciaPreferida', 'dataDoacao'
    ];

    for (let campo of camposObrigatorios) {
      if (!form[campo]) {
        alert(`Campo obrigatório: ${campo}`);
        return;
      }
    }

    const contribuinteParaEnviar = {
      ...form,
      formasDeDoacao: form.formasDeDoacao.split(',').map(s => s.trim()),
    };

    try {
      const response = await axios.post(API_BASE_URL, contribuinteParaEnviar);
      setContribuintes([response.data, ...contribuintes]);
      setForm({
        nomeCompleto: '',
        telefone: '',
        cpf: '',
        estado: '',
        cidade: '',
        rua: '',
        numero: '',
        formasDeDoacao: '',
        tipoContribuinte: '',
        frequenciaPreferida: '',
        dataDoacao: '',
      });
    } catch (error) {
      console.error('Erro ao adicionar contribuinte:', error);
      alert('Erro ao adicionar contribuinte');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja excluir este contribuinte?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setContribuintes(contribuintes.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar contribuinte:', error);
      alert('Erro ao deletar contribuinte');
    }
  };

  if (loading) return <div>Carregando contribuintes...</div>;

  return (
    <div className="about-page">
      <h1>Contribuintes</h1>

      <form className="contato-form" onSubmit={handleSubmit}>
        <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} placeholder="Nome Completo" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" required />
        <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" required />
        <input name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" required />
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" required />
        <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" required />
        <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" required />
        <input name="formasDeDoacao" value={form.formasDeDoacao} onChange={handleChange} placeholder="Formas de Doação (separadas por vírgula)" required />
        <input name="tipoContribuinte" value={form.tipoContribuinte} onChange={handleChange} placeholder="Tipo Contribuinte" required />
        <input name="frequenciaPreferida" value={form.frequenciaPreferida} onChange={handleChange} placeholder="Frequência Preferida" required />
        <input type="date" name="dataDoacao" value={form.dataDoacao} onChange={handleChange} required />

        <button type="submit" className="btn-green">Adicionar Contribuinte</button>
      </form>

      <ul className="page-list">
        {contribuintes.length === 0 && <li>Nenhum contribuinte cadastrado.</li>}
        {contribuintes.map((c) => (
          <li key={c.id} style={{ marginBottom: '15px' }}>
            <strong>Nome:</strong> {c.nomeCompleto}<br />
            <strong>CPF:</strong> {c.cpf}<br />
            <strong>Telefone:</strong> {c.telefone}<br />
            <strong>Endereço:</strong> {`${c.rua}, ${c.numero} - ${c.cidade}/${c.estado}`}<br />
            <strong>Formas de Doação:</strong> {c.formasDeDoacao.join(', ')}<br />
            <strong>Tipo:</strong> {c.tipoContribuinte}<br />
            <strong>Frequência:</strong> {c.frequenciaPreferida}<br />
            <strong>Data da Doação:</strong> {c.dataDoacao}<br />
            <button className="btn-red" style={{ marginTop: '8px' }} onClick={() => handleDelete(c.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContribuintesPage;
