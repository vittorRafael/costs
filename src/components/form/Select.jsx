import React from 'react';
import styles from './Select.module.css';

const Select = ({ text, name, options, handleOnChange, value }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}: </label>
      <select name={name} id={name}>
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
