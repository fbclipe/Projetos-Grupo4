// src/pages/HomeadmPage.jsx
import React from 'react';
// Não precisamos mais do 'Link' do react-router-dom aqui, pois não serão links
// import { Link } from 'react-router-dom'; 

const HomeadmPage = () => (
  <div className="homeadm-page" style={adminHomeStyles.container}>
    <h1 style={adminHomeStyles.heading}>Bem-vindo ao Painel de Administração</h1>
    <p style={adminHomeStyles.subheading}>As funcionalidades disponíveis são:</p>

    {/* Usando uma lista não ordenada para as funcionalidades */}
    <ul style={adminHomeStyles.featureList}>
      <li style={adminHomeStyles.featureListItem}>
        {/* Título da funcionalidade - COR ALTERADA AQUI */}
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar Notícias</h2>
        <p style={adminHomeStyles.cardDescription}>Adicione, edite ou exclua notícias do site.</p>
      </li>

      <li style={adminHomeStyles.featureListItem}>
        {/* Título da funcionalidade - COR ALTERADA AQUI */}
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar Eventos</h2>
        <p style={adminHomeStyles.cardDescription}>Gerencie eventos, datas e parceiros.</p>
      </li>

      <li style={adminHomeStyles.featureListItem}>
        {/* Título da funcionalidade - COR ALTERADA AQUI */}
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar FAQs</h2>
        <p style={adminHomeStyles.cardDescription}>Adicione e organize perguntas frequentes.</p>
      </li>

      <li style={adminHomeStyles.featureListItem}>
        {/* Título da funcionalidade - COR ALTERADA AQUI */}
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar Usuários</h2>
        <p style={adminHomeStyles.cardDescription}>Administre contas de usuário e permissões.</p>
      </li>

      {/* Adicione mais itens de lista para outras funcionalidades administrativas aqui */}
      {/*
      <li style={adminHomeStyles.featureListItem}>
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar Depoimentos</h2>
        <p style={adminHomeStyles.cardDescription}>Aprove e organize depoimentos de clientes.</p>
      </li>
      <li style={adminHomeStyles.featureListItem}>
        <h2 style={adminHomeStyles.cardTitle}>Gerenciar Contribuintes</h2>
        <p style={adminHomeStyles.cardDescription}>Visualize e gerencie dados de contribuintes.</p>
      </li>
      */}
    </ul>
  </div>
);

// Estilos básicos inline (mantenha em seu arquivo CSS real para melhor prática)
const adminHomeStyles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    minHeight: 'calc(100vh - 120px)', // Ajuste para o tamanho do header/footer
  },
  heading: {
    fontSize: '2.5em',
    color: '#343a40',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '1.2em',
    color: '#6c757d',
    marginBottom: '40px',
  },
  featureList: {
    listStyle: 'none', // Remove os marcadores de lista padrão
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Colunas responsivas
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureListItem: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    color: '#333', // Cor do texto
    minHeight: '150px', // Altura mínima para cartões uniformes
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: '1.5em',
    // A cor foi alterada de '#007bff' para 'black' aqui
    color: 'black', 
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '1em',
    color: '#555',
    lineHeight: '1.5',
  },
};

export default HomeadmPage;