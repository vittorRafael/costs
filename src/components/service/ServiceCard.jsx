import React from 'react';
import styles from '../project/ProjetoCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

const ServiceCard = ({ service, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(service.id, service.custo);
  };

  return (
    <div className={styles.projetoCard}>
      <h4>{service.nome}</h4>
      <p>
        <span>Custo total: </span> R$ {service.custo}
      </p>
      <p>{service.descricao}</p>
      <div className={styles.projetoCardActions}>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
