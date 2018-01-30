import React, { Component } from 'react';
import Roslib from 'roslib'

class Map extends Component {
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
      <TipArrow length={s / 10} angle={0} x={s / 2} y={s / 40} />
      <TipArrow length={s / 10} angle={270} x={s / 40} y={s / 2} />
      <TipArrow length={s / 10} angle={180} x={s / 2} y={s - s / 40} />
      <TipArrow length={s / 10} angle={90} x={s - s / 40} y={s / 2} />
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

const standardArrow = [[-1.5, 2], [0, 0], [1.5, 2], [0, 0], [0, 10]];

function TipArrow(props) {
  return makeArrow(standardArrow, props.length, props.angle, props.x, props.y);
}

function BaseArrow(props) {
  return makeArrow(translatePoints(standardArrow, 0, -10), props.length, props.angle, props.x, props.y);
}

function Border(props) {
  let s = props.size;
  let points = [[1, 1], [s - 1, 1], [s - 1, s - 1], [1, s - 1], [1, 1]];
  return <polyline fill="none" stroke="black" points={pointsToString(points)} />;
}

function makeArrow(baseArrow, length, angle, x, y) {
  let scaled = scalePoints(baseArrow, length / 10, length / 10);
  let rotated = rotatePoints(scaled, angle);
  let placed = translatePoints(rotated, x, y);
  return <polyline fill="none" stroke="black" points={pointsToString(placed)} />;
}

function translatePoints(pts, x, y) {
  return pts.map(pt => [pt[0] + x, pt[1] + y]);
}

function scalePoints(pts, xScale, yScale) {
  return pts.map(pt => [pt[0] * xScale, pt[1] * yScale]);
}

// Clockwise rotation: using math for counterclockwise, but y-axis is flipped in SVG
function rotatePoints(pts, a) {
  let rad = Math.PI / 180 * a;
  return pts.map(pt => [pt[0] * Math.cos(rad) - pt[1] * Math.sin(rad),
    pt[0] * Math.sin(rad) + pt[1] * Math.cos(rad)]);
}

function pointsToString(pts) {
  return pts.map(pt => pt.join(',')).join(' ');
}

export default Map;
