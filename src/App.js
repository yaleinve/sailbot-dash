import React, {Component} from 'react';
import styles from './stylesheets/App.css';

import Map from './Map';
import TextContainer from './TextContainer';
import Readout from './Readout';
import Control from './Control';


class App extends Component {

    // /* fn passed from App to T.C. in order to change text values
    //     @param cb = callback from T.C. to change val */
    // _changeTextValue(cb) {
    //
    // }

    render() {
        return [
            <div className={styles.mapCol} key="mapCol">
                <Map size="500" rosbridgeAddr="192.168.56.101:9090"/>
            </div>,
            <div className={styles.dataCol} key="dataCol">
                <TextContainer
                  changeTextValue = {this._changeTextValue}
                />
            </div>,
            <div className={styles.controlCol} key="controlCol">
                <Readout size="250" rosbridgeAddr="192.168.56.101:9090"/>
                <Control name="Control Panel" size="250"/>
            </div>
        ];
    }
}

export default App;
