import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (<svg xmlns="http://www.w3.org/2000/svg" width={this.props.size} height={this.props.size}>
      <BaseArrow length={50} angle={170} x={100} y={100} />
      <TipArrow length={50} angle={190} x={100} y={100} />
    </svg>);
  }
}

const standardArrow = [[-1.5, 2], [0, 0], [1.5, 2], [0, 0], [0, 10]];

function TipArrow(props) {
  let scaled = scalePoints(standardArrow, props.length / 10, props.length / 10);
  let rotated = rotatePoints(scaled, props.angle);
  let placed = translatePoints(rotated, props.x, props.y);
  return <polyline fill="none" stroke="black" points={pointsToString(placed)} />;
}

function BaseArrow(props) {
  let basedArrow = translatePoints(standardArrow, 0, -10);
  let scaled = scalePoints(basedArrow, props.length / 10, props.length / 10);
  let rotated = rotatePoints(scaled, props.angle);
  let placed = translatePoints(rotated, props.x, props.y);
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
  return pts.map(pt => pt.join(",")).join(" ");
}

export default Map;
