import React from 'react';
import styles from './Mensagem.module.css';

const Mensagem = ({ type, msg }) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    } else {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <>
      {visible && <div className={`${styles.msg} ${styles[type]}`}>{msg}</div>}
    </>
  );
};

export default Mensagem;
