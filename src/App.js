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
        <TextBox name="Test Name" value="2nd column" width="150px" />
      </div>,
      <div className={styles.controlCol}>
        <Readout size="250" rosbridgeAddr="192.168.56.101:9090" />
        <Control name="Control Panel" size="250" />
      </div>
    ];
  }
}

export default App;
