import React, {Component} from 'react';
import TextBox from './TextBox';

import styles from './stylesheets/TextContainer.css';

class TextContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: '',
      heading: '',
      main: '',
      jib: '',
      rudder: '',
      windspeed: '',
      roll: '',
      xte: '',
      vmg: ''
    }

      props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.airmarListener(msg));
      props.addListener('/sails_rudder_pos', 'sails_rudder/SailsRudderPos', msg => this.sailsListener(msg));
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
          vmg: msg.VMG
      });
  }

  sailsListener(msg) {
      this.setState({
          main: msg.mainPos,
          jib: msg.jibPos,
          rudder: msg.rudderPos
      });
  }
}

export default TextContainer;
