import React, {Component} from 'react';
import TextBox from './TextBox';

import styles from './stylesheets/TextContainer.css';

class TextContainer extends Component {
  constructor () {
    super();
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
}

export default TextContainer;
