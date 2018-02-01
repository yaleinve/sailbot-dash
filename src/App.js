import React, { Component } from 'react';
import styles from './App.css';

import Map from './Map';
import TextBox from './TextBox';
import Readout from './Readout';
import Control from './Control';


class App extends Component {
  render() {
    return [
      <div className={styles.mapCol}>
        <Map size="500" rosbridgeAddr="192.168.56.101:9090" />
      </div>,
      <div className={styles.dataCol}>
        <table className={styles.box} style={{width: "100%"}}>
            <TextBox name="Speed" value="unimplemented" width="150px" />
            <TextBox name="Heading" value="unimplemented" width="150px" />
            <TextBox name="Main" value="unimplemented" width="150px" />
            <TextBox name="Jib" value="unimplemented" width="150px" />
            <TextBox name="Rudder" value="unimplemented" width="150px" />
            <TextBox name="Wind Speed" value="unimplemented" width="150px" />
            <TextBox name="Roll" value="unimplemented" width="150px" />
            <TextBox name="XTE" value="unimplemented" width="150px" />
            <TextBox name="VMG" value="unimplemented" width="150px" />
        </table>
      </div>,
      <div className={styles.controlCol}>
        <Readout size="250" rosbridgeAddr="192.168.56.101:9090" />
        <Control name="Control Panel" size="250" />
      </div>
    ];
  }
}

export default App;
