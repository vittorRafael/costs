import React from 'react';
import styles from './ProjetoForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

const ProjetoForm = ({ btnText, handleSubmit, projetoData }) => {
  const [categorias, setCategorias] = React.useState([]);
  const [projeto, setProjeto] = React.useState(projetoData || []);

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

  const submit = (e) => {
    e.preventDefault();
    //console.log(projeto);
    handleSubmit(projeto);
  };

  function handleChange(e) {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    setProjeto({
      ...projeto,
      categoria: {
        id: e.target.value,
        nome: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="nome"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={projeto.nome ? projeto.nome : ''}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="valorTotal"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={projeto.valorTotal ? projeto.valorTotal : ''}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categorias}
        handleOnChange={handleSelect}
        value={projeto.categoria ? projeto.categoria.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ProjetoForm;
