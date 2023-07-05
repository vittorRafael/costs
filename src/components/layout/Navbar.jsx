import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Início</Link>
          </li>
          <li className={styles.item}>
            <Link to="/empresa">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contato">Contato</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
