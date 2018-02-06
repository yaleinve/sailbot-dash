import React from 'react';
import styles from './stylesheets/TextBox.css';

function TextBox(props) {
    return (
        <tr>
            <th className={styles.th}>{props.name + ":"}</th>
            <td className={styles.cell}>{props.value}</td>
        </tr>
    );
}

export default TextBox;
