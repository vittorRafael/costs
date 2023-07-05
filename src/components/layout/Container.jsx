import React from 'react';
import styles from './Container.module.css';
const Container = ({ children, customClass }) => {
  return (
    <section className={`${styles.container} ${styles[customClass]}`}>
      {children}
    </section>
  );
};

export default Container;
