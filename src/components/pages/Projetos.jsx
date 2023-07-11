import React from 'react';
import Mensagem from '../layout/Mensagem';
import styles from './Projetos.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import { useLocation } from 'react-router-dom';
import ProjetoCard from '../project/ProjetoCard';
import Loading from '../layout/Loading';

const Projetos = () => {
  const [projetos, setProjetos] = React.useState([]);
  const [removerLoading, setRemoveLoading] = React.useState(false);
  const [projetoMessage, setProjetoMessage] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projetos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => {
          setProjetos(r);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  const location = useLocation();
  let message = '';

  if (location.state) {
    message = location.state.message;
  }

  function removeProjeto(id) {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id));
        setProjetoMessage('Projeto removido com sucesso!');
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar projeto" />
      </div>
      {(message || projetoMessage) && (
        <Mensagem msg={message || projetoMessage} type="success" />
      )}
      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              handleRemove={removeProjeto}
            />
          ))}
        {!removerLoading && <Loading />}
        {removerLoading && projetos.length === 0 && (
          <p>Não há projetos cadastrados</p>
        )}
      </Container>
    </section>
  );
};

export default Projetos;
