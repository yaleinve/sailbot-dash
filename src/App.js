import React, { Component } from 'react';
import styles from './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return <Map size="500" rosbridgeAddr="192.168.56.101:9090" />;
  }
}

export default App;
