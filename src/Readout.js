import React, {Component} from 'react';

import {Border, Image} from "./ReadoutComponents";

let arrow = require("./assets/arrow.png")
let boat = require("./assets/boat.png")
let rudder = require("./assets/rudder.png")
let sail = require("./assets/sail.png")

class Readout extends Component {
    constructor(props) {
        super(props);

        props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.rosListener(msg));
        props.addListener('/sails_rudder_pos', 'sails_rudder/SailsRudderPos', msg => this.sailsListener(msg));

        this.state = {
            heading: 30,
            truWindDir: 60,
            main: 30,
            jib: 30,
            rudder: 30
        };
    }

    render() {
        // let img = "/src/assets/arrow.pn

        let s = this.props.size;
        let heading = 360 - this.state.heading

        return (<svg xmlns="http://www.w3.org/2000/svg" width={s} height={s}>
            <Border size={s}/>
            <text x={s / 2 - 5} y={15} fontSize="15"> N</text>
            <text x={s / 2 - 5} y={s - s / 40} fontSize="15"> S</text>
            <text x={s - 15} y={s / 2 + 5} fontSize="15"> E</text>
            <text x={s / 40} y={s / 2 + 5} fontSize="15"> W</text>

            <Image size={s} url={boat} r={0} angle="0"
                   orientation={heading} width="50" height="125"/>
            <Image size={s} url={arrow} r={s / 2 - s / 7}
                   angle={this.state.truWindDir}
                   orientation={180 - this.state.truWindDir}
                   width="10" height="25"/>
            <Image name = "rudder"
                   size={s} url={rudder} r="47" angle={(180 - heading)}
                   orientation={heading - this.state.rudder}
                   width="40" height="60"/>
            <Image size={s} url={sail} r="47" angle={(360 - heading)}
                   orientation={heading + this.state.jib}
                   width="50" height="75"/>
            <Image size={s} url={sail} r="0" angle="0"
                   orientation={heading + this.state.main}
                   width="80" height="120"/>
        </svg>);
        // <TipArrow length={s / 5} angle={this.state.heading} x={s / 2} y={s / 2}/>
        // <TipArrow length={s / 5} angle={this.state.truWindDir} x={s / 2} y={s / 4}/>
    }

    rosListener(msg) {
        this.setState({heading: msg.heading, truWindDir: msg.truWndDir});
    }

    sailsListener(msg) {
      this.setState({
          main: msg.mainPos,
          jib: msg.jibPos,
          rudder: msg.rudderPos
      });
    }
}

export default Readout
