import './App.css';
import RegisterUser from './RegisterUser';

function App() {
  return (
    <div className="App">
      <main style={{ padding: '2rem' }}>
        <h1 style={{ color: '#1e3a8a' }}>Cadastro de Usuário</h1>
        <RegisterUser />
      </main>
    </div>
  );
}

export default App;
