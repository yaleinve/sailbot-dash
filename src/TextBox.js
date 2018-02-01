import React from 'react';
import styles from './TextBox.css';

function TextBox(props) {
  return (
      <tr>
        <th className={styles.cell, styles.th}>{props.name + ":"}</th>
        <td className={styles.cell}>{props.value}</td>
      </tr>
  );
}

export default TextBox;
