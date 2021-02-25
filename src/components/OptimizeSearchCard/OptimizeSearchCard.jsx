/* eslint-disable */
import React, { Component } from 'react';
import './optimizesearchcard.css';
import TextField from '@material-ui/core/TextField';
import submitArrow from '../../components/images/send.png';
import * as getCityAPI from '../../Apis/city';
import { withRouter } from "react-router-dom";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";


const SearchBox = (props) => {
    const { setLocation } = props;
    const PlacesWithStandaloneSearchBox = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnwxVjWJBvN9sUc7O8yPIKN-o08jCkUA&v=3&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            setLocation: props.setLocation
        }),
        lifecycle({
            componentWillMount() {
                const refs = {}

                this.setState({
                    places: [],
                    onSearchBoxMounted: ref => {
                        refs.searchBox = ref;
                        window.ref = refs.searchBox;
                    },
                    onPlacesChanged: () => {
                        const places = refs.searchBox.getPlaces();
                        this.props.setLocation({
                            location: places[0].formatted_address,
                            latitude: places[0].geometry.location.lat(),
                            longitude: places[0].geometry.location.lng()
                        });
                    },
                });
            },
        }),
        withScriptjs
    )(props =>
        <div data-standalone-searchbox="">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}
                options={{
                    componentRestrictions: { country: 'in' }
                }}
                componentRestrictions={{ country: 'in' }}
            >
                <TextField
                    className="adjustDropdownInput"
                    id="outlined-select-currency-native"
                    label="Location"
                    placeholder="Select Your Location"
                    name="location"
                    autoComplete='off'
                    options={{
                        componentRestrictions: { country: 'in' }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                >
                </TextField>
            </StandaloneSearchBox>
        </div>
    );
    const searchBox = React.useMemo(() => <PlacesWithStandaloneSearchBox />, []);
    return <>{searchBox}</>;
}

class OptimizeSearchCard extends Component {
    state = {
        location: "",
        latitude: null,
        longitude: null,

        locationData: [
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madhya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand',
            'West Bengal'
        ],
        locationTab: true,
        mobLocationTab: true,
        mobDurationTab: false,
        mobareaTab: false,
        durationTab: false,

        areaTab: false,
        typingTimeout: 0,
        stateData: [],
        duration: "",
        area: ""
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: "" });
    };

    setLocation = (loc) => {
        console.log("calling");
        console.log(loc);
        this.setState({
            ...this.state,
            ...loc
        });
    }

    handleStateChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.state.typingTimeout) {
                clearTimeout(this.state.typingTimeout);
            }
            this.setState({
                typingTimeout: setTimeout(() => {
                    if (this.state.location.length > 0) {
                        getCityAPI.getCity(this.state.location,
                            (data) => {
                                console.log(data)
                                this.setState({
                                    stateData: data
                                })
                            }, () => { }
                        )
                    }
                }, 500),
            });
        })
    }
    render() {
        return (
            <div className="optimizeSearchCardContainer">
                <h3>Find your space here...</h3>
                <p>Do you require an e commerce fulfillment centre or long term warehouse space or a temporary on demand storage space? Discover all such places and many more...</p>
                <div className="formContainer">
                    <div className="stateSuggestionContainer">
                        <SearchBox setLocation={this.setLocation} />
                    </div>
                    <TextField
                        id="outlined-full-width"
                        label="Duration"
                        placeholder="Enter no. of weeks"
                        fullWidth
                        name="duration"
                        value={this.state.duration}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Area Sq. Ft."
                        placeholder="Enter your area space"
                        fullWidth
                        name="area"
                        value={this.state.area}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <div className="submitButton" onClick={() => this.props.history.push(`/search?location=${this.state.location}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&duration=${this.state.duration}&area=${this.state.area}`)}>
                        <div className="btnText">Start</div>
                    </div>
                </div>
                <div className="formContainerTabletMobile">
                    {this.state.locationTab ?
                        <div className="mobileFormAdjust">
                            <SearchBox setLocation={this.setLocation} />
                            <div className="submitButton"
                                onClick={() => this.setState({
                                    locationTab: false,
                                    durationTab: true,
                                    areaTab: false
                                })}>
                                <img src={submitArrow} alt="" />
                            </div>
                        </div>

                        : <React.Fragment />}
                    {this.state.durationTab ?
                        <div className="mobileFormAdjust">
                            <TextField
                                id="outlined-full-width"
                                label="Duration"
                                placeholder="Enter no. of weeks"
                                name="duration"
                                value={this.state.duration}
                                onChange={this.handleChange}
                                // fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <div className="submitButton" onClick={() => this.setState({
                                locationTab: false,
                                durationTab: false,
                                areaTab: true
                            })}>
                                <img src={submitArrow} alt="" />
                            </div>
                        </div>
                        : <React.Fragment />}
                    {this.state.areaTab ?
                        <div className="mobileFormAdjust">
                            <TextField
                                id="outlined-full-width"
                                label="Area Sq. Ft."
                                placeholder="Enter your area space"
                                // fullWidth
                                name="area"
                                value={this.state.area}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <div className="submitButton" onClick={() => this.props.history.push(`/search?location=${this.state.location}&duration=${this.state.duration}&area=${this.state.area}`)}>
                                <img src={submitArrow} alt="" />
                            </div>
                        </div> : <React.Fragment />}
                </div>
                <div className="tabContainer">
                    <div className={this.state.locationTab ? "activeTab" : "tabText"} onClick={() => this.setState({
                        locationTab: true,
                        durationTab: false,
                        areaTab: false
                    })}>Location</div>
                    <div className="divideBorder"></div>
                    <div className={this.state.durationTab ? "activeTab" : "tabText"} onClick={() => this.setState({
                        locationTab: false,
                        durationTab: true,
                        areaTab: false
                    })}>Duration</div>
                    <div className="divideBorder"></div>
                    <div className={this.state.areaTab ? "activeTab" : "tabText"} onClick={() => this.setState({
                        locationTab: false,
                        durationTab: false,
                        areaTab: true
                    })}>Area Sq.ft</div>
                </div>
            </div>
        );
    }
}
export default withRouter(OptimizeSearchCard);