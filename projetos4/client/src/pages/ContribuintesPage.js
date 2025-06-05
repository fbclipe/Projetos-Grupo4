// src/pages/AdicionarContribuintePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addContribuinte } from '../services/contribuinteService';

const AdicionarContribuintePage = () => {
  const [form, setForm] = useState({
    nomeCompleto: '',
    telefone: '',
    cpf: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    formasDeDoacao: '', // String para input do formulário
    tipoContribuinte: '',
    frequenciaPreferida: '',
    dataDoacao: '',
  });

  const navigate = useNavigate();

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
        alert(`Campo obrigatório não preenchido: ${campo.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    const contribuinteParaEnviar = {
      ...form,
      // Converte a string de formasDeDoacao para um array antes de enviar
      formasDeDoacao: form.formasDeDoacao.split(',').map(s => s.trim()),
    };

    try {
      await addContribuinte(contribuinteParaEnviar);
      alert('Cadastro realizado com sucesso!');
      navigate('/sucesso'); // Redireciona para a página de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar contribuinte:', error);
      alert('Erro ao cadastrar contribuinte. Por favor, tente novamente.');
    }
  };

  return (
    <div className="main-page" style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h1>Seja um Contribuinte!</h1>
      <p style={{ marginBottom: '20px', lineHeight: '1.6', color: '#555' }}>
        Preencha o formulário abaixo para se tornar um contribuinte e nos ajudar a continuar com o nosso trabalho.
      </p>

      <form className="contribuinte-form" onSubmit={handleSubmit} style={formStyles.form}>
        <label htmlFor="nomeCompleto" style={formStyles.label}>Nome Completo:</label>
        <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} placeholder="Seu nome completo" required style={formStyles.input} />

        <label htmlFor="telefone" style={formStyles.label}>Telefone:</label>
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" required style={formStyles.input} />

        <label htmlFor="cpf" style={formStyles.label}>CPF:</label>
        <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="XXX.XXX.XXX-XX" required style={formStyles.input} />

        <label htmlFor="estado" style={formStyles.label}>Estado:</label>
        <input name="estado" value={form.estado} onChange={handleChange} placeholder="Ex: SP" required style={formStyles.input} />

        <label htmlFor="cidade" style={formStyles.label}>Cidade:</label>
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Ex: São Paulo" required style={formStyles.input} />

        <label htmlFor="rua" style={formStyles.label}>Rua:</label>
        <input name="rua" value={form.rua} onChange={handleChange} placeholder="Nome da rua" required style={formStyles.input} />

        <label htmlFor="numero" style={formStyles.label}>Número:</label>
        <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número da residência" required style={formStyles.input} />

        <label htmlFor="formasDeDoacao" style={formStyles.label}>Formas de Doação Preferidas (separadas por vírgula):</label>
        <input name="formasDeDoacao" value={form.formasDeDoacao} onChange={handleChange} placeholder="Ex: PIX, Cartão de Crédito" required style={formStyles.input} />

        <label htmlFor="tipoContribuinte" style={formStyles.label}>Tipo de Contribuinte:</label>
        <input name="tipoContribuinte" value={form.tipoContribuinte} onChange={handleChange} placeholder="Ex: Pessoa Física" required style={formStyles.input} />

        <label htmlFor="frequenciaPreferida" style={formStyles.label}>Frequência Preferida:</label>
        <input name="frequenciaPreferida" value={form.frequenciaPreferida} onChange={handleChange} placeholder="Ex: Mensal, Única" required style={formStyles.input} />

        <label htmlFor="dataDoacao" style={formStyles.label}>Data da Primeira Doação (estimada):</label>
        <input type="date" name="dataDoacao" value={form.dataDoacao} onChange={handleChange} required style={formStyles.input} />

        <button type="submit" style={formStyles.submitButton}>
          Cadastrar Contribuinte
        </button>
      </form>
    </div>
  );
};

// Estilos para o formulário
const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#333',
    fontSize: '0.95em',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1em',
    width: '100%',
    boxSizing: 'border-box', // Garante que padding não adicione largura extra
  },
  submitButton: {
    // MUDANÇA AQUI: Cor de fundo do botão para verde
    backgroundColor: '#28a745', // Verde
    color: 'white',
    padding: '14px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.15em',
    fontWeight: '600',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-start', // Alinha o botão à esquerda se o formulário for menor
  },
};

export default AdicionarContribuintePage;