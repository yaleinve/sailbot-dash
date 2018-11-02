import React, {Component} from 'react';
import styles from './stylesheets/App.css';

import Map from './Map';
import TextContainer from './TextContainer';
import Readout from './Readout';
import Control from './Control';
import Roslib from "roslib";


class App extends Component {
    constructor(props) {
        super(props);

        this._addListener = this._addListener.bind(this);
        this._publish = this._publish.bind(this);

        this.ros = this._setupRos("192.168.0.98:9090"); // Ratchet router
        // this.ros = this._setupRos("172.29.35.63:9090"); // Yale wifi
        this.subTopics = {};
        this.pubTopics = {};

        this._ratchetIpAddress = this._ratchetIpAddress.bind(this);
        this._yaleIpAddress = this._yaleIpAddress.bind(this);
    }

    _setupRos(addr) {
        let ros = new Roslib.Ros({url: 'ws://' + addr});

        ros.on('connection', () => {
            console.log('Connected to websocket server.');
        });

        ros.on('error', error => {
            console.log('Error connecting to websocket server: ', error);
        });

        return ros;
    }

    /**
     * Pass this to the addListener prop of a component to allow that component to register ROS listeners.
     * @param {string} topicName Name of the topic to subscribe to, see InVe_Arch_Specs.txt in the main project
     * @param {string} msgType ROS data type of the topic, also see InVe_Arch_Specs.txt
     * @param {Function} listener Callback that takes a message object, make sure that `this` is bound correctly
     * @private
     */
    _addListener(topicName, msgType, listener) {
        let topic;
        console.log("Adding listener for " + topicName);
        if (topicName in this.subTopics) {
            topic = this.subTopics[topicName];
        } else {
            topic = new Roslib.Topic({
                ros: this.ros,
                name: topicName,
                messageType: msgType
            });
            topic.calls = [];
            topic.on('warning', warn => console.log("ROS topic warning: " + warn));
            topic.on('error', warn => console.log("ROS topic error: " + warn));
            this.subTopics[topicName] = topic;
            console.log("Adding new subscription topic " + topicName);
            topic.subscribe(msg => {
                for (let i in topic.calls) {
                    (topic.calls[i])(msg);
                }
            });
        }
        topic.calls.push(listener);
    }

    // switch Edison to search for Ratchet Router IP address
    _ratchetIpAddress() {
      this.ros = this._setupRos("192.168.0.98:9090"); // Ratchet router
      console.log("Switching Edison to ratchet router wifi...");
    }

    // switch Edison to search for Ratchet Router IP address
    _yaleIpAddress() {
      this.ros = this._setupRos("172.29.35.63:9090"); // Yale wifi
      console.log("Switching Edison to yale wifi...");
    }

    _publish(topicName, msgType, msg) {
        let topic;
        console.log("Publishing to " + topicName);
        if (topicName in this.pubTopics) {
            topic = this.pubTopics[topicName];
        } else {
            topic = new Roslib.Topic({
                ros: this.ros,
                name: topicName,
                messageType: msgType
            });
            topic.on('warning', warn => console.log("ROS topic warning: " + warn));
            topic.on('error', warn => console.log("ROS topic error: " + warn));
            this.pubTopics[topicName] = topic;
            console.log("Adding new publication topic " + topicName);
        }
        topic.publish(msg);
    }

    render() {
        return (
          <div id="appbox">
            <div className={styles.wifiButtons}>
              <button onClick={this._ratchetIpAddress}>Switch to Ratcheet Router</button>
              <button onClick={this._yaleIpAddress}>Switch to YaleWifi</button>
            </div>
            <div className={styles.mapCol} key="mapCol">
                <Map size="600" publish={this._publish} addListener={this._addListener}/>
            </div>
            <div className={styles.dataCol} key="dataCol">
                <TextContainer
                    addListener={this._addListener}
                />
            </div>
            <div className={styles.controlCol} key="controlCol">
                <Readout size="250" addListener={this._addListener}/>
                <Control name="Control Panel" size="250" publish={this._publish}/>
            </div>


        </div>
      );
    }

}

export default App;
