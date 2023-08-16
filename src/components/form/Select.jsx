import React from 'react';
import styles from './Select.module.css';

const Select = ({ text, name, options, handleOnChange, value }) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}: </label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option._id} key={option._id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
