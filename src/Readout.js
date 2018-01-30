import React, { Component } from 'react';
import Roslib from 'roslib'

import { TipArrow, BaseArrow, Border} from "./MapComponents";

class Readout extends Component {
  constructor(props) {
    super(props);
    let ros = this.setupRos(this.props.rosbridgeAddr);
    this.state = {
      ros: ros,
      listener: this.setupListener(ros),
      heading: 0.0,
      truWindDir: 0.0
    };
  }

  render() {
    let s = this.props.size;
    return (<svg xmlns="http://www.w3.org/2000/svg" width={s} height={s}>
      <Border size={s} />
      <text x = {s / 2} y = {s / 25} font-size = "15"> N </text>
      <text x = {s / 2} y = {s - s / 40} font-size = "15"> S </text>
      <text x = {s - s / 25} y = {s / 2} font-size = "15"> E </text>
      <text x = {s / 40} y = {s / 2} fill = "black" font-size = "15"> W </text>
      <TipArrow length={s / 5} angle={this.state.heading} x={s / 2} y={s / 2} />
      <TipArrow length={s / 5} angle={this.state.truWindDir} x={s / 2} y={s / 4} />
    </svg>);
  }

  setupRos(addr) {
    let ros = new Roslib.Ros({url: 'ws://' + addr});

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
    });

    ros.on('error', error => {
      console.log('Error connecting to websocket server: ', error);
    });

    return ros;
  }

  setupListener(ros) {
    let listener = new Roslib.Topic({
      ros: ros,
      name: '/airmar_data',
      messageType: 'airmar/AirmarData'
    });

    listener.subscribe(msg => {
      this.setState({heading: msg.heading, truWindDir: msg.truWndDir});
    });

    return listener;
  }
}

export default Readout;
