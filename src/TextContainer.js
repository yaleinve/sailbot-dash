import React, {Component} from 'react';
import RosLib from 'roslib';

class TextContainer extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <table className={styles.box} style={{width: "100%"}}>
          <tbody>
          <TextBox name="Speed" value={this.state.speed} width="150px"/>
          <TextBox name="Heading" value={this.state.heading} width="150px"/>
          <TextBox name="Main" value={this.state.main} width="150px"/>
          <TextBox name="Jib" value={this.state.} width="150px"/>
          <TextBox name="Rudder" value={this.state.} width="150px"/>
          <TextBox name="Wind Speed" value={this.state.} width="150px"/>
          <TextBox name="Roll" value={this.state.} width="150px"/>
          <TextBox name="XTE" value={this.state.} width="150px"/>
          <TextBox name="VMG" value={this.state.} width="150px"/>
          </tbody>
      </table>
    )
  }
}

export default TextContainer;
