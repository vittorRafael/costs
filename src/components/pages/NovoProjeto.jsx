import React from 'react';
import styles from './NovoProjeto.module.css';
import ProjetoForm from '../project/ProjetoForm';
const NovoProjeto = () => {
  return (
    <section className={styles.novoProjetoContainer}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços!</p>
      <ProjetoForm btnText="Criar Projeto" />
    </section>
  );
};

export default NovoProjeto;
