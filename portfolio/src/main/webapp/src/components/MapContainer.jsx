import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
      return (
        <Map
          google={this.props.google}
          zoom={8}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDnIFqZ8EqTAOJXorggZ_fEo_vQ4L_aYFA'
})(MapContainer)