import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(){
    super();

    this.getCurrentLocation = this.getCurrentLocation.bind(this);

    this.state = {
        latitude: null,
        longitude: null,
    }
  }


  getCurrentLocation = () => {
      console.log("in function");
    if (navigator.geolocation) {
      console.log("deeper function");
      navigator.geolocation.watchPosition(position => {
          this.setState({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
          })
      });
    } else {
        console.log("No location found.")
    }
  }

  render() {
      {this.getCurrentLocation()};
      const latitude = this.state.latitude;
      const longitude = this.state.longitude;

      return (
        <div className="map-container">
            <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: latitude, lng: longitude}}
            style={{height: '60%', width: '50%'}}
            >
                <Marker position={{ lat: latitude, lng: longitude}} />
            </Map>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDnIFqZ8EqTAOJXorggZ_fEo_vQ4L_aYFA'
})(MapContainer)