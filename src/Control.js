import React, { Component } from 'react';

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
          textbox: "",
          gpstarget: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyGPS = this.verifyGPS.bind(this);

    }

    handleChange(event) {
        this.setState({textbox: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const temp = this.state.textbox;
        this.setState({
          gpstarget: temp,
          textbox: ''
        },
          this.verifyGPS(temp)
        )
    }

    verifyGPS(currentgps) {
        currentgps = currentgps.replace(",", "");
        const gps = currentgps.split(" ");

        const lat = gps[0] || 0;
        const lng = gps[1] || 0;

        // IF DESTINATION NEEDED TO BE WITHIN REGION, CHECK LATITUDE & LONGITUDE HERE
        if (lat < -90 || lat > 90) {
            alert("Latitude must be between -90 and 90 degrees inclusive.");
            this.setState({gpstarget: ' '});
        }

        else if (lng < -180 || lng > 180) {
            alert("Longitude must be between -180 and 180 degrees inclusive.");
            this.setState({gpstarget: 'Longitude must be between -180 and 180 degrees inclusive.'});
        }

        else if (lat === "" || lng === "" || isNaN(lat) || isNaN(lng)) {
            alert("ERROR: Enter a valid Latitude or Longitude!");
            this.setState({gpstarget: ' '});
            return;
        }
        // valid gps -- order boat to this coordinate
        else {
          // CHECK NEXT WEEK THAT THIS COORDINATE GOES THRU
          let msg = {
              comp_mode: 'SailToPoint',
              gps_lat1: lat,
              gps_long1: lng,
              xte_min: -20,
              xte_max: 20
          };

          this.props.publish("/competition_info", "captain/CompetitionInfo", msg);
          console.log('Sending message to ros...', msg);
        }
    }

    render() {
        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                  <label>
                      Insert GPS Point:
                      <h5>(separate two pos/neg decimal lat/long coord with a space)</h5>

                      <br />
                      <input type="text" name="name" value={this.state.textbox} onChange={this.handleChange} />

                  </label>
                  <br />
                  <input type="submit" value="Submit"/>
              </form>

              <h4> Current GPS Target: {this.state.gpstarget}</h4>
          </div>
        );
    }
}

export default Control
