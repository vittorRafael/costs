import React from 'react';
import Mensagem from '../layout/Mensagem';
import { useLocation } from 'react-router-dom';

const Projetos = () => {
  const location = useLocation();
  let message = '';

  if (location.state) {
    message = location.state.message;
  }

  return (
    <section>
      <h1>Meus Projetos</h1>
      {message && <Mensagem msg={message} type="success" />}
    </section>
  );
};

export default Projetos;
