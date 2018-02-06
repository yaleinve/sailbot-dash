import React, {Component} from 'react';
import TextBox from './TextBox';

import styles from './stylesheets/TextContainer.css';

class TextContainer extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <table className={styles.box} style={{width: "100%"}}>
          <tbody>
          <TextBox name="Speed" value={this.props.speed} width="150px"/>
          <TextBox name="Heading" value={this.props.heading} width="150px"/>
          <TextBox name="Main" value={this.props.main} width="150px"/>
          <TextBox name="Jib" value={this.props.jib} width="150px"/>
          <TextBox name="Rudder" value={this.props.rudder} width="150px"/>
          <TextBox name="Wind Speed" value={this.props.windspeed} width="150px"/>
          <TextBox name="Roll" value={this.props.roll} width="150px"/>
          <TextBox name="XTE" value={this.props.xte} width="150px"/>
          <TextBox name="VMG" value={this.props.vmg} width="150px"/>
          </tbody>
      </table>
    )
  }
}

export default TextContainer;
