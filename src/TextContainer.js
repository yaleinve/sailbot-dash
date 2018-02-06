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
          <TextBox name="Speed" value="unimplemented" width="150px"/>
          <TextBox name="Heading" value="unimplemented" width="150px"/>
          <TextBox name="Main" value="unimplemented" width="150px"/>
          <TextBox name="Jib" value="unimplemented" width="150px"/>
          <TextBox name="Rudder" value="unimplemented" width="150px"/>
          <TextBox name="Wind Speed" value="unimplemented" width="150px"/>
          <TextBox name="Roll" value="unimplemented" width="150px"/>
          <TextBox name="XTE" value="unimplemented" width="150px"/>
          <TextBox name="VMG" value="unimplemented" width="150px"/>
          </tbody>
      </table>
    )
  }
}

export default TextContainer;
