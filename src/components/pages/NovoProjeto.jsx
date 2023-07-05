import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NovoProjeto.module.css';
import ProjetoForm from '../project/ProjetoForm';

const NovoProjeto = () => {
  const history = useNavigate();
  function createPost(projeto) {
    projeto.custo = 0;
    projeto.servicos = [];

    fetch('http://localhost:5000/projetos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        history('/projetos', { message: 'Projeto criado com sucesso!' });
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className={styles.novoProjetoContainer}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços!</p>
      <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto" />
    </section>
  );
};

export default NovoProjeto;
