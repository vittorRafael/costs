import React from 'react';
import styles from './ProjetoCard.module.css';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

const ProjetoCard = ({ projeto, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(projeto.id);
  };

  return (
    <article className={styles.projetoCard}>
      <h4>{projeto.nome}</h4>
      <p>
        <span>Orçamento: </span> R$ {projeto.valorTotal}
      </p>
      <p className={styles.categoriaText}>
        <span
          className={`${styles[projeto.categoria.nome.toLowerCase()]}`}
        ></span>{' '}
        R$ {projeto.categoria.nome}
      </p>
      <div className={styles.projetoCardActions}>
        <Link to={`/projeto/${projeto.id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </article>
  );
};

export default ProjetoCard;
