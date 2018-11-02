import React from 'react';
import styles from './stylesheets/TextBox.css';

function TextBox(props) {
    var val = ""
    if (props.value) {
        val = props.value
        if (props.unit) val = val + props.unit
    }
    return (
        <tr>
            <th className={styles.th}>{props.name + ":"}</th>
            <td className={styles.cell}>{val}</td>
        </tr>
    );
}

export default TextBox;
