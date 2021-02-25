/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWNvb2w0MTUxIiwiYSI6ImNrZTVwbjJjdzBiNDIyeW41dmc4bmExcTkifQ.gtlBKhY-JUZTQepkMWOAfg';

export default class Application extends React.Component {
    mapRef = React.createRef();
    stateMap = undefined;

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 11.5,
            map: undefined,
            mapCreated: false,
        };
    }

    componentDidMount() {
        console.log("Mapo");
        console.log(this.props);
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [this.props.center.lng, this.props.center.lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        this.setState({
            ...this.state,
            map: map,
            mapCreated: true
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props === nextProps) return false;
        console.log("rendering");
        return true;
    }

    render() {
        const { lng, lat, zoom } = this.state;
        let nlat = 0;
        let nlng = 0;
        if (this.state.mapCreated) {
            this.props.markers.map(item => {
                nlng += item.lng;
                nlat += item.lat;
                let marker = new mapboxgl.Marker()
                    .setLngLat([item.lng, item.lat])
                    .addTo(this.state.map);
            });
            if (this.props.markers.length > 0) {
                this.state.map.flyTo({
                    center: [
                        nlng / this.props.markers.length,
                        nlat / this.props.markers.length
                    ],
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
            }
        }
        return (
            <div>
                <div ref={this.mapRef} style={{
                    ...this.props.mapStyles,
                }} />
            </div>
        );
    }
}
