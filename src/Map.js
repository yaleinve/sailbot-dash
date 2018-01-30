import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';


const accessToken = 'pk.eyJ1IjoiaW52ZSIsImEiOiJjamQyMnBwam8yODJrMzNxbzFpZWJsYngxIn0.eVIGhm4ZQ8H4u6goKE6xdA' // Mapbox access token

class Map extends Component {
    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        }
    };

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
            />
        );
    }
}

export default Map
