import React, {Component} from 'react';
import TextBox from './TextBox';

import styles from './stylesheets/TextContainer.css';

class TextContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // SailsRudder
            main: '',
            jib: '',
            rudder: '',
            // AirmarData
            speed: '',
            heading: '',
            windspeed: '',
            roll: '',
            xte: '',
            vmg: '',
            lat: '',
            long: '',
            // Nav Targets
            targetCourse: '', // on boat
            targetRange: '',
            targetHeading: '', // on boat
            pointOfSail: '',
            // captain/LegInfo
            beginLat: '',
            beginLong: '',
            endLat: '',
            endLong: '',
            // captain/CompetitionInfo
            compMode: '',
            angle: '',
            isAutonomous: '',
        };

        props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.airmarListener(msg));
        props.addListener('/sails_rudder_pos', 'sails_rudder/SailsRudderPos', msg => this.sailsListener(msg));
        props.addListener('/leg_info', 'captain/LegInfo', msg => this.legListener(msg));
        props.addListener('/nav_targets', 'tactics/NavTargets', msg => this.targetListener(msg));
        props.addListener('/competition_info', 'captain/CompetitionInfo', msg => this.competitionListener(msg));
    }

    render () {
        return (
                <table className={styles.box} style={{width: "100%"}}>
                <tbody>
                <TextBox name="Speed" value={this.state.speed} width="150px"/>
                <TextBox name="Heading" value={this.state.heading} width="150px"/>
                <TextBox name="Main" value={this.state.main} width="150px"/>
                <TextBox name="Jib" value={this.state.jib} width="150px"/>
                <TextBox name="Rudder" value={this.state.rudder} width="150px"/>
                <TextBox name="Wind Speed" value={this.state.windspeed} width="150px"/>
                <TextBox name="Roll" value={this.state.roll} width="150px"/>
                <TextBox name="XTE" value={this.state.xte} width="150px"/>
                <TextBox name="VMG" value={this.state.vmg} width="150px"/>
                <TextBox name="Latitude" value={this.state.lat} width="150px"/>
                <TextBox name="Longitude" value={this.state.long} width="150px"/>
                <TextBox name="Distance Left" value={this.state.targetRange} width="150px"/>
                <TextBox name="P.O.S" value={this.state.pointOfSail} width="150px"/>
                <TextBox name="Mode" value={this.state.compMode} width="150px"/>
                <TextBox name="Autonomous" value={this.state.isAutonomous} width="150px"/>
                </tbody>
                </table>
               )
    }

    airmarListener(msg) {
        this.setState({
            speed: msg.sog,
            heading: msg.heading,
            windspeed: msg.truWndSpd,
            roll: msg.amrRoll,
            xte: msg.XTE,
            vmg: msg.VMG,
            lat: msg.lat,
            long: msg.long
        });
    }

    sailsListener(msg) {
        this.setState({
            main: msg.mainPos,
            jib: msg.jibPos,
            rudder: msg.rudderPos
        });
    }

    legListener(msg) {
        this.setState({
            beginLat: msg.begin_lat,
            beginLong: msg.begin_long,
            endLat: msg.end_lat,
            endLong: msg.end_long
        });
    }

    targetListener(msg) {
        this.setState({
            targetCourse: msg.targetCourse,
            targetRange: msg.targetRange,
            targetHeading: msg.targetHeading,
            pointOfSail: msg.pointOfSail
        });
    }

    competitionListener(msg) {
        this.setState({
            compMode: msg.comp_mode,
            angle: msg.angle,
            isAutonomous: msg.currently_autonomous
        });
    }
}

export default TextContainer;
