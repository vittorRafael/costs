import React from 'react';
import styles from './Projeto.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjetoForm from '../project/ProjetoForm';
import ServiceForm from '../service/ServiceForm';
import Mensagem from '../layout/Mensagem';
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../service/ServiceCard';

const Projeto = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [showProjetoForm, setShowProjetoForm] = React.useState(false);
  const [showServiceForm, setShowServiceForm] = React.useState(false);
  const [mensagem, setMensagem] = React.useState();
  const [tipo, setTipo] = React.useState();
  React.useEffect(() => {
    fetch(`https://costsbackend.onrender.com/projetos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setProjeto(r);
        setServices(r.servicos);
      });
  }, [id]);

  function editPost(projeto) {
    setMensagem('');
    if (projeto.valorTotal < projeto.custo) {
      //mensagem
      setMensagem('O orçamento não pode ser menor que o custo do projeto!');
      setTipo('error');
      return false;
    }

    fetch(`https://costsbackend.onrender.com/projetos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((r) => r.json())
      .then((r) => {
        setProjeto(r);
        setShowProjetoForm(false);
        //mensagem
        setMensagem('Projeto Atualizado');
        setTipo('success');
      })
      .catch((err) => console.log(err));

    console.log(projeto);
  }

  function criarService(projeto) {
    setMensagem('');
    //last service
    const lastService = projeto.servicos[projeto.servicos.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.custo;
    const newCost = parseFloat(projeto.custo) + parseFloat(lastServiceCost);

    //max validation
    if (newCost > parseFloat(projeto.valorTotal)) {
      setMensagem('Orçamento ultrapassado, verifique o valor do serviço!');
      setTipo('error');
      projeto.servicos.pop();
      return;
    }

    //add service
    projeto.custo = newCost;

    //update project
    fetch(`https://costsbackend.onrender.com/projetos/${projeto._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((r) => r.json())
      .then((r) => {
        setProjeto(r);
        toggleServiceForm();
      })
      .catch((err) => console.log(err));
  }

  function toggleProjetoForm() {
    setShowProjetoForm(!showProjetoForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, custo) {
    const servicesUpdate = projeto.servicos.filter(
      (service) => service.id !== id,
    );
    const projetoUpdate = projeto;

    projetoUpdate.servicos = [...servicesUpdate];
    projetoUpdate.custo = parseFloat(projetoUpdate.custo) - parseFloat(custo);

    fetch(`https://costsbackend.onrender.com/projetos/${projetoUpdate._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projetoUpdate),
    })
      .then((r) => r.json())
      .then((r) => {
        setProjeto(projetoUpdate);
        setServices(servicesUpdate);
        setMensagem('Serviço removido com sucesso');
        setTipo('success');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {projeto.nome ? (
        <div className={styles.projetoDetails}>
          <Container customClass="column">
            {mensagem && <Mensagem type={tipo} msg={mensagem} />}
            <div className={styles.detailsContainer}>
              <h1>Projeto: {projeto.nome}</h1>
              <button className={styles.btn} onClick={toggleProjetoForm}>
                {!showProjetoForm ? 'Editar Projeto' : 'Fechar Projeto'}
              </button>
              {!showProjetoForm ? (
                <div className={styles.projetoInfo}>
                  <p>
                    <span>Categoria: </span> {projeto.categoria.nome}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span> R$ {projeto.valorTotal}
                  </p>
                  <p>
                    <span>Total Utilizado: </span> R$ {projeto.custo}
                  </p>
                </div>
              ) : (
                <div className={styles.projetoInfo}>
                  <ProjetoForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projetoData={projeto}
                  />
                </div>
              )}
            </div>
            <div className={styles.serviceFormContainer}>
              <h2>Adicione um serviço: </h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.projetoInfo}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={criarService}
                    btnText="Adicionar Serviço"
                    projetoData={projeto}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    service={service}
                    handleRemove={removeService}
                    key={service.id}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados!</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Projeto;
