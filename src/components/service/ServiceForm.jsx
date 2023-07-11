import React from 'react';
import styles from '../project/ProjetoForm.module.css';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

const ServiceForm = ({ handleSubmit, btnText, projetoData }) => {
  const [service, setService] = React.useState({});

  function submit(e) {
    e.preventDefault();
    projetoData.servicos.push(service);
    handleSubmit(projetoData);
  }
  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do serviço"
        name="nome"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="custo"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="descricao"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ServiceForm;
