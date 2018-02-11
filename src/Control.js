import React, { Component } from 'react';

class Control extends Component {
    constructor(props) {
        super(props);
        // this.state = {

        // };
    }

    render() {
        return ( <button onClick={this.activateLasers}> Activate Lasers </button>);
    }

    activateLasers(props){
        console.log('ACTIVATED')
    }
}

export default Control
