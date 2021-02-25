/* eslint-disable */
import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

import CustomMap from 'components/SelectionMap/CustomMap'

export class SelectionMap extends Component {
  state = {
    coords: {
      latitude: 0,
      longitude: 0,
    },
    isLoading: true,
    callBack: (lat, lng) => { }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.setState({
          coords: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          isLoading: false
        })
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount = () => {
    if (this.props.coords) {
      this.setState({
        coords: this.props.coords,
        isLoading: false
      })
    } else this.getLocation()
    if (this.props.callBack) {
      this.setState({ callBack: this.props.callBack })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.coords !== this.props.coords) {
      this.setState({
        coords: this.props.coords,
      })
    }
  }

  handleClick = (t, map, coords) => {
    let lat = coords.latLng.lat()
    let lng = coords.latLng.lng()
    this.state.callBack(lat, lng)
    this.setState({ coords: { latitude: lat, longitude: lng } })
  }

  render() {
    return (
      this.state.isLoading ? <></> :
        <div style={{ position: 'relative' }}>
          <CustomMap
            google={this.props.google}
            edit={this.props.edit}
            coords={this.state.coords}
            handleClick={this.handleClick}
            height={this.props.height}
            width={this.props.width}
          />
        </div>
    );
  }
}

// API Key From Hubshub
// AIzaSyBNnwxVjWJBvN9sUc7O8yPIKN-o08jCkUA

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDEUrxj_264nIjsidTNu4HpTSZOCAJ0pww')
})(SelectionMap)