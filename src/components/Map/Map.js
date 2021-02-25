import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { compose, withProps, withHandlers } from "recompose";
import { MarkerCluster } from "react-google-maps/lib/components/addons/MarkerClusterer";

export default function Map(props) {
    const MapComponent = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnwxVjWJBvN9sUc7O8yPIKN-o08jCkUA&v=3&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `auto` }} />,
            mapElement: <div style={{ height: `100%` }} />,
            ...props
        }),
        withHandlers({
            onMarkerClustererClick: () => (markerClusterer) => {
                const clickedMarkers = markerClusterer.getMarkers()
                console.log(`Current clicked markers length: ${clickedMarkers.length}`)
                console.log(clickedMarkers)
            },
        }),
        withScriptjs,
        withGoogleMap
    )((props) =>
        <GoogleMap
            defaultZoom={8}
            style={props.mapStyles}
            defaultCenter={props.center}
        >
            {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />} */}
            {/* <MarkerCluster
                onClick={props.onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={60}
            > */}
            {props.children}
            {/* </MarkerCluster> */}
        </GoogleMap>
    );
    let dependencies = props.children.map(item => item);
    const cachedMap = React.useMemo(() => <MapComponent />, [dependencies])
    return <>{cachedMap}</>
}