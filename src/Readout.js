import React, {Component} from 'react';

import {Border, Image} from "./ReadoutComponents";

let arrow = require("./assets/arrow.png")
let boat = require("./assets/boat.png")
let rudder = require("./assets/rudder.png")
let sail = require("./assets/sail.png")
let target = require("./assets/heading.png")

class Readout extends Component {
    constructor(props) {
        super(props);

        props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.rosListener(msg));
        props.addListener('/sails_rudder_pos', 'sails_rudder/SailsRudderPos', msg => this.sailsListener(msg));
        // props.addListener('/leg_info', 'captain/LegInfo', msg => this.legListener(msg));
        props.addListener('/nav_targets', 'tactics/NavTargets', msg => this.targetListener(msg));
        // props.addListener('/competition_info', 'captain/CompetitionInfo', msg => this.competitionListener(msg));

        this.state = {
            // Airmar Data
            heading: 170,
            truWindDir: 300,
            // Sails Rudder
            main: 30,
            jib: 30,
            rudder: 30,
            // Leg Info
                // beginLat: 0,
                // beginLong: 0,
                // endLat: 0,
                // endLong: 0,
            // Nav Targets
            targetCourse: 0,
            targetRange: 0,
            targetHeading: 0,
            // Competition Info
                // compMode: 0,
                // angle: 0
       };
    }

    render() {
        let s = this.props.size;
        let heading = 360 - this.state.heading

        // -1 if wind is over the LHS of the boat
        // +1 if wind is over the RHS of the boat
        var sails_side = 1
        if (((this.state.truWindDir - this.state.heading) % 180) >= 0) {
            sails_side = -1
        }

        //TODO: remove magic numbers for image ratios and sizes
        return (<svg xmlns="http://www.w3.org/2000/svg" width={s} height={s}>
            <Border size={s}/>
            <text x={s / 2 - 5} y={15} fontSize="15"> N</text>
            <text x={s / 2 - 5} y={s - s / 40} fontSize="15"> S</text>
            <text x={s - 15} y={s / 2 + 5} fontSize="15"> E</text>
            <text x={s / 40} y={s / 2 + 5} fontSize="15"> W</text>

            <Image size={s} url={target} r={s/2 - s/10} angle={this.state.targetCourse}
                    orientation={0} width="10" height="10"/>
            <Image size={s} url={boat} r={0} angle="0"
                   orientation={heading} width="50" height="125"/>
            <Image size={s} url={arrow} r={s / 2 - s / 7}
                   angle={this.state.truWindDir}
                   orientation={180 - this.state.truWindDir}
                   width="10" height="25"/>
            <Image name="rudder"
                   size={s} url={rudder} r="47" angle={(180 + heading)}
                   orientation={heading - this.state.rudder}
                   width="40" height="60"/>
            <Image name="jib"
                   size={s} url={sail} r="47" angle={(360 + heading)}
                   orientation={heading + (this.state.jib * sails_side)}
                   width="50" height="75"/>
            <Image name="main"
                   size={s} url={sail} r="0" angle="0"
                   orientation={heading + (this.state.main * sails_side)}
                   width="80" height="120"/>
        </svg>);
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

    // legListener(msg) {
    //     this.setState({
    //         beginLat: msg.begin_lat,
    //         beginLong: msg.begin_long,
    //         endLat: msg.end_lat,
    //         endLong: msg.end_long
    //     });
    // }

    targetListener(msg) {
        this.setState({
            targetCourse: msg.targetCourse,
            targetRange: msg.targetRange,
            targetHeading: msg.targetHeading,
        });
    }

    // competitionListener(msg) {
    //     this.setState({
    //         compMode: msg.comp_mode,
    //         angle: msg.angle
    //     });
    // }
}

export default Readout
