import React from 'react';

function Border(props) {
    let s = props.size;
    let points = [[1, 1], [s - 1, 1], [s - 1, s - 1], [1, s - 1], [1, 1]];
    return <polyline fill="#BBDAE8" stroke="black" points={pointsToString(points)}/>;
}

function pointsToString(pts) {
    return pts.map(pt => pt.join(',')).join(' ');
}

// Old logic for displaying arrows
/*
const standardArrow = [[-1.5, 2], [0, 0], [1.5, 2], [0, 0], [0, 10]];

function TipArrow(props) {
    return makeArrow(standardArrow, props.length, props.angle, props.x, props.y);
}

function BaseArrow(props) {
    return makeArrow(translatePoints(standardArrow, 0, -10), props.length, props.angle, props.x, props.y);
}


function makeArrow(baseArrow, length, angle, x, y) {
    let scaled = scalePoints(baseArrow, length / 10, length / 10);
    let rotated = rotatePoints(scaled, angle);
    let placed = translatePoints(rotated, x, y);
    return <polyline fill="none" stroke="black" points={pointsToString(placed)}/>;
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

*/

function polarToCartesian(r, angle, size, width, height) {
    let rad = Math.PI / 180 * angle
    let x = r * Math.sin(rad) + (size / 2.0) - (width / 2.0)
    let y = r * Math.cos(rad) + (size / 2.0) - (height / 2.0)
    return [x, y]
}

function transformationString(x, y, rotation) {
    return ["rotate(", rotation, " ", x, " ", y, ")"].join('')
}

//
function Image(props) {
    let a = props.angle - 180
    let [x, y] = polarToCartesian(props.r, a, props.size, props.width, props.height)
    let x_center = x + props.width / 2.0
    let y_center = y + props.height / 2.0
    let ts = transformationString(x_center, y_center, props.orientation)
    return <image href={props.url} x={x} y={y} width={props.width} transform={ts}/>
}

export {Border, Image};
