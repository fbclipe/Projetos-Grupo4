import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sistema from './pages/Sistema';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sistema />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
