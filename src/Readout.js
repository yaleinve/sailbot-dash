import React, {Component} from 'react';

import {TipArrow, Border} from "./ReadoutComponents";

class Readout extends Component {
    constructor(props) {
        super(props);

        props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.rosListener(msg));
        this.state = {
            heading: 0.0,
            truWindDir: 0.0
        };
    }

    render() {
        let s = this.props.size;
        return (<svg xmlns="http://www.w3.org/2000/svg" width={s} height={s}>
            <Border size={s}/>
            <text x={s / 2} y={15} fontSize="15"> N</text>
            <text x={s / 2} y={s - s / 40} fontSize="15"> S</text>
            <text x={s - 15} y={s / 2} fontSize="15"> E</text>
            <text x={s / 40} y={s / 2} fontSize="15"> W</text>
            <TipArrow length={s / 5} angle={this.state.heading} x={s / 2} y={s / 2}/>
            <TipArrow length={s / 5} angle={this.state.truWindDir} x={s / 2} y={s / 4}/>
        </svg>);
    }

    rosListener(msg) {
        console.log("Readout Listener");
        this.setState({heading: msg.heading, truWindDir: msg.truWndDir});
    }
}

export default Readout;
