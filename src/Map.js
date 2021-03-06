import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, {Marker} from 'react-map-gl';

import Mapstyle from './mapstyle-raster'

import MARKER_STYLE from './marker-style';

class Map extends Component {
    constructor(props) {
        super(props);

        // props.addListener('/leg_info', 'captain/LegInfo',
        //                   msg => this.rosListener(msg));

        // bind for callback see:
        // https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
        this._onClick = this._onClick.bind(this);
        props.addListener('/airmar_data', 'airmar/AirmarData', msg => this.airmarListener(msg));

        // Toggle offline and online maps
        var style = "mapbox://styles/mapbox/dark-v9";
        if (require('./config.json').offline) {
            style = Mapstyle
        }

        this.state = {
            poi: [
                // {"name":"Point 1","coordinates":[41.258245, -72.850291]},
                // {"name":"Point 2","coordinates":[41.258245, -72.858291]},
                // {"name":"Point 3","coordinates":[41.252245, -72.858291]},
                // {"name":"Point 4","coordinates":[41.252245, -72.850291]}
            ],
            // stored as [lat, long, speed]
            destination: [41.252245, -72.858291],
            path_history: [],
            viewport: {
                width: 600,
                height: 600,
                latitude: 41.256243,
                longitude: -72.850389,
                zoom: 14
            },
            didSetup : 1,
            settings: {
                dragPan: true,
                dragRotate: true,
                scrollZoom: true,
                touchZoom: true,
                touchRotate: true,
                keyboard: true,
                doubleClickZoom: false,
                minZoom: 0,
                maxZoom: 20,
                minPitch: 0,
                maxPitch: 85,
                onClick: this._onClick
            },
            mapstyle: style
        };
    }

    _onClick(event) {
        this.setState({
            destination: [event.lngLat[1], event.lngLat[0]]
        });

        let msg = {
            comp_mode: 'SailToPoint',
            gps_lat1: event.lngLat[1],
            gps_long1: event.lngLat[0],
            xte_min: -20,
            xte_max: 20
        };

        this.props.publish("/competition_info", "captain/CompetitionInfo", msg);
    }

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || window.innerWidth,
                height: this.props.height || window.innerHeight
            }
        });
    };

    _onViewportChange(viewport) {
        this.setState({viewport});
    }

    _updateBoatPath() {
        var data = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": this.state.path_history.slice(-300).map(pt => [pt[1], pt[0]])
            }
        };
        this.map.getSource('trace').setData(data);
    }

    _renderBoatPath(map) {
        if (map.getSource('trace') === undefined) {
            map.addSource('trace', {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": this.state.path_history.map(pt => [pt[1], pt[0]])
                    }
                }
            });
            map.addLayer({
                "id": "trace",
                "type": "line",
                "source": "trace",
                "layout": {
                    "line-join": "round",
                    "line-cap": "butt"
                },
                "paint": {
                    "line-color": "#888",
                    "line-width": 4
                }
            });
        }

        this.map = map
        var timer = window.setInterval( this._updateBoatPath.bind(this), 100);
    }

    _renderMarker(station, i) {
        const {name, coordinates} = station;
        return (
            <Marker key={i} latitude={coordinates[0]} longitude={coordinates[1]}>
            <div className="station"><span>{name}</span></div>
            </Marker>
        );
    }

    airmarListener(msg) {
        // TODO: path color by speed (msg.isog)
        var joined = this.state.path_history.concat([[msg.lat, msg.long]]);
        this.setState({
            path_history: joined
        });
    }


    render() {
        var boatMarker = {"name":"Boat","coordinates":[0,0]}
        if (this.state.path_history.length >= 1) {
            boatMarker["coordinates"] = this.state.path_history.slice(-1)[0];
        }

        return (
            <MapGL
                {...this.state.settings}
                {...this.state.viewport}
                ref = {(map) => {
                    if (map !== null) {
                        map.getMap().on('load', () => this._renderBoatPath(map.getMap()))
                    }
                }}

            onViewportChange={(viewport) => this.setState({viewport})}
            mapStyle={this.state.mapstyle}>
            <style>{MARKER_STYLE}</style>
            {this.state.poi.map(this._renderMarker)}
            {this._renderMarker({"name": "Target", "coordinates": this.state.destination})}
            {this._renderMarker(boatMarker)}
            </MapGL>
        );
    }
}

export default Map
