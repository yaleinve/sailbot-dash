import React from 'react';

function Border(props) {
    let s = props.size;
    let points = [[1, 1], [s - 1, 1], [s - 1, s - 1], [1, s - 1], [1, 1]];
    return <polyline fill="#BBDAE8" stroke="black" points={pointsToString(points)}/>;
}

function pointsToString(pts) {
    return pts.map(pt => pt.join(',')).join(' ');
}

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
