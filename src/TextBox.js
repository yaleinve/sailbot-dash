import React from 'react';
import styles from './TextBox.css';

function TextBox(props) {
  return (
    <table className={styles.box} style={{width: props.width}}>
      <tr><th className={styles.cell}>{props.name}</th></tr>
      <tr><td className={styles.cell}>{props.value}</td></tr>
    </table>
  );
}

export default TextBox;
