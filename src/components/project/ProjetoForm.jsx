import React from 'react';
import styles from './ProjetoForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

const ProjetoForm = ({ btnText }) => {
  const [categorias, setCategorias] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((r) => setCategorias(r))
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="nome"
        placeholder="Insira o nome do projeto"
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="valorTotal"
        placeholder="Insira o orçamento total"
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categorias}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ProjetoForm;
