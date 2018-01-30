import React from 'react';

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

export { TipArrow, BaseArrow, Border };
