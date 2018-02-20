import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, {Marker} from 'react-map-gl';

import Mapstyle from './mapstyle-raster'

import MARKER_STYLE from './marker-style';

class Map extends Component {
    constructor(props) {
      super(props);

      // bind for callback see:
      // https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6
      this._onClick = this._onClick.bind(this)

      this.state = {
        poi: [
            {"name":"Point 1","coordinates":[41.258245, -72.850291]},
            {"name":"Point 2","coordinates":[41.258245, -72.858291]},
            {"name":"Point 3","coordinates":[41.252245, -72.858291]},
            {"name":"Point 4","coordinates":[41.252245, -72.850291]}],
        boat_location: [41.256245, -72.855291],
        destination: [41.256245, -72.855291],
        path_history: [[41.256245, -72.855291],
                        [41.256245, -72.855291],
                        [41.256245, -72.855291],
                        [41.256245, -72.855291]],
        viewport: {
            width: 600,
            height: 600,
            latitude: 41.256243,
            longitude: -72.850389,
            zoom: 14
        },
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
        }
      };
    };

    _onClick(event) {
        this.setState({
            destination: [event.lngLat[1], event.lngLat[0]]
        });

        let msg = {
            comp_mode: 'SailToPoint',
            gps_lat1: event.lngLat[1],
            gps_long1: event.lngLat[0],
            xte_min: -5,
            xte_max: 5
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

    _renderBoatPath(path) {
        // return (
        //    <Layer type="line" layout={lineLayout} paint={linePaint}>
        //        <Feature coordinates={mappedRoute} />
        //    </Layer>
        //);
    }

    _renderTarget(loc) {
        return (
            <Marker key={"destination"} latitude={loc[0]} longitude={loc[1]}>
                <div className="target"><span>{"destination"}</span></div>
            </Marker>
        );

    }

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
                mapStyle={Mapstyle}>
                <style>{MARKER_STYLE}</style>
                {this.state.poi.map(this._renderMarker)}
                {this._renderTarget(this.state.destination)}
                {this._renderBoatPath(this.state.path_history)}
            </MapGL>
        );
    }
}

export default Map
