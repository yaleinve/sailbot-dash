import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, {Marker} from 'react-map-gl';

import MARKER_STYLE from './marker-style';
import gps_locs from './test_locs.json';

class Map extends Component {
    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 41.256243,
            longitude: -72.850389,
            zoom: 12
        },
        settings: {
            dragPan: true,
            dragRotate: true,
            scrollZoom: true,
            touchZoom: true,
            touchRotate: true,
            keyboard: true,
            doubleClickZoom: true,
            minZoom: 0,
            maxZoom: 20,
            minPitch: 0,
            maxPitch: 85
        }
    };

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };

    _onViewportChange = viewport => this.setState({viewport});

    _renderMarker(station, i) {
        const {name, coordinates} = station;
        return (
            <Marker key={i} latitude={coordinates[0]} longitude={coordinates[1]}>
                <div className="station"><span>{name}</span></div>
            </Marker>
        );
    }

    render() {
        return (
            <MapGL
                {...this.state.settings}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                mapStyle="mapbox://styles/mapbox/dark-v9">
                <style>{MARKER_STYLE}</style>
                {gps_locs.map(this._renderMarker)}
            </MapGL>
        );
    }
}

export default Map
