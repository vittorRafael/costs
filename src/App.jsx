import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import NovoProjeto from './components/pages/NovoProjeto';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/empresa">Empresa</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
        <li>
          <Link to="/novoprojeto">Novo Projeto</Link>
        </li>
      </ul>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
