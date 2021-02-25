import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';

class CustomMap extends Component {
  state = {
    lat: 0,
    lng: 0,
    valid: false,
    google: "",
    width: "300px",
    height: "200px",
  }

  componentDidMount() {
    this.setState({
      lat: this.props.coords.latitude,
      lng: this.props.coords.longitude,
      valid: true,
      google: this.props.google,
      width: this.props.width,
      height: this.props.height,

    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      this.setState({
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude,
        valid: true
      });
    }
  }

  render() {
    return (
      this.state.valid ?
        <Map
          draggableCursor="default"
          google={this.state.google}
          style={{
            position: 'relative',
            width: this.state.width,
            height: this.state.height,
          }}
          // loadingElement={<div style={{ height: "100%" }} />}
          containerStyle={{ position: 'relative' }}
          // mapElement={<div style={{ height: "100%" }} />}
          zoom={14}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          onClick={this.props.handleClick}
        >
          <Marker
            position={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            title="test"
          />
        </Map > : <></>
    );
  }
}

export default CustomMap;