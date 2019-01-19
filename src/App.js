import React, {Component} from 'react';
import styles from './stylesheets/App.css';

import Map from './Map';
import TextContainer from './TextContainer';
import Readout from './Readout';
import Control from './Control';
import Roslib from "roslib";

var dest = {"Jared": "192.168.64.10:9090",
            "Linc": "172.29.35.63:9090",
            "Yale": "172.29.35.63:9090",
            "Rachet": "192.168.0.98:9090",
            "Miles": "localhost:9090"
          };

var DEFAULT = "Miles"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          showBanner: false,
          warningMessage: "",
          dest: DEFAULT,
          ros: this._setupRos(dest[DEFAULT])
        }

        this._addListener = this._addListener.bind(this);
        this._publish = this._publish.bind(this);
        this._onChange = this._onChange.bind(this);

        this.subTopics = {};
        this.pubTopics = {};

        this._showBanner = this._showBanner.bind(this);
    }

    _setupRos(addr) {
        console.log(addr);
        let ros = new Roslib.Ros({url: 'ws://' + addr});

        ros.on('connection', () => {
            console.log('Connected to websocket server.');
        });

        ros.on('error', error => {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', () => {
            console.log('Disconnected form websocket server.');
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
                ros: this.state.ros,
                name: topicName,
                messageType: msgType
            });
            topic.calls = [];
            topic.on('warning', warn => {
              console.log("ROS topic warning: " + warn);
              this._showBanner("ROS topic warning: " + warn);
            });
            topic.on('error', warn => {
              console.log("ROS topic error: " + warn);
              this._showBanner("ROS topic error: " + warn);
            });
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

    // Show message banner about warning/error
    _showBanner(err) {
      this.setState({         // show banner
        showBanner: true,
        warningMessage: err
      });

      setTimeout(() => {      // clear banner after 3 secs
        this.setState({
          showBanner: false,
          warningMessage: ""
        })
      }, 3 * 1000)
    }

    // switch Edison to search for Ratchet Router IP address
    _onChange(element) {
        console.log("NOTE: THIS SWITCH DOES NOT CURRENTLY UPDATE THE ROS LISTENER AND PUBLISHER");
        console.log("PLEASE switch the default in App.js or fix the code ;) ");
        var val = element.target.value;
        this.setState({
            dest: val,
            ros: this._setupRos(dest[val])
        });
    }

    _publish(topicName, msgType, msg) {
        let topic;
        console.log("Publishing to " + topicName);
        if (topicName in this.pubTopics) {
            topic = this.pubTopics[topicName];
        } else {
            topic = new Roslib.Topic({
                ros: this.state.ros,
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
            {this.state.showBanner && <div class="alert alert-primary" role="alert">
              {this.state.warningMessage}
            </div>}
            <div className={styles.wifiButtons}>
              <select id="dest" onChange={this._onChange} value={this.state.dest}>
                {
                  Object.keys(dest).map(val => {
                    return <option key={val} value={val}>{val}</option>
                  })
                }
              </select>
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
