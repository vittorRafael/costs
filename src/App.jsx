import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import NovoProjeto from './components/pages/NovoProjeto';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projetos from './components/pages/Projetos';
import Projeto from './components/pages/Projeto';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/projeto/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
