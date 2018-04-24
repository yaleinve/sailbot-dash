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
        props.addListener('/speed_stats', 'speed_calculator/SpeedStats', msg => this.speedStatsListener(msg));
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
                <TextBox name="Target Course" value={this.state.targetCourse} width="150px"/>
                <TextBox name="Target Heading" value={this.state.targetHeading} width="150px"/>
                <TextBox name="Target Range" value={this.state.targetRange} width="150px"/>
                <TextBox name="Mode" value={this.state.compMode} width="150px"/>
                <TextBox name="Autonomous" value={this.state.isAutonomous} width="150px"/>
                </tbody>
                </table>
               )
    }

    airmarListener(msg) {
        this.setState({
            speed: parseFloat(msg.sog).toFixed(2),
            heading: parseFloat(msg.heading).toFixed(1),
            windspeed: parseFloat(msg.truWndSpd).toFixed(2),
            roll: parseFloat(msg.amrRoll).toFixed(1),
            xte: parseFloat(msg.XTE).toFixed(1),
            vmg: parseFloat(msg.VMG).toFixed(2),
            lat: parseFloat(msg.lat).toFixed(6),
            long: parseFloat(msg.long).toFixed(6)
        });
    }

    speedStatsListener(msg) {
        this.setState({
            xte: parseFloat(msg.xte).toFixed(1),
            vmg: parseFloat(msg.vmg).toFixed(2)
        });
    }

    sailsListener(msg) {
        this.setState({
            main: parseFloat(msg.mainPos).toFixed(1),
            jib: parseFloat(msg.jibPos).toFixed(1),
            rudder: parseFloat(msg.rudderPos).toFixed(1)
        });
    }

    legListener(msg) {
        this.setState({
            beginLat: parseFloat(msg.begin_lat).toFixed(6),
            beginLong: parseFloat(msg.begin_long).toFixed(6),
            endLat: parseFloat(msg.end_lat).toFixed(6),
            endLong: parseFloat(msg.end_long).toFixed(6)
        });
    }

    targetListener(msg) {
        this.setState({
            targetCourse: parseFloat(msg.targetCourse).toFixed(1),
            targetRange: parseFloat(msg.targetRange).toFixed(2),
            targetHeading: parseFloat(msg.targetHeading).toFixed(1),
            pointOfSail: msg.pointOfSail
        });
    }

    competitionListener(msg) {
        this.setState({
            compMode: msg.comp_mode,
            angle: parseFloat(msg.angle).toFixed(2),
            isAutonomous: msg.currently_autonomous
        });
    }
}

export default TextContainer;
