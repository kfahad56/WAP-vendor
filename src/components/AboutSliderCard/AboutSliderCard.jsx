import React, { Component } from 'react';
import './aboutslidercard.css';
import meeting from '../images/meeting.png';
class AboutSliderCard extends Component {
    state = {}
    render() {
        return (
            <div className="aboutSliderCardContainer">
                <div className="leftSection">
                    <div className="SliderImage">
                        <img src={meeting} alt="" />
                    </div>
                </div>
                <div className="rightSection">
                    <h3>Our Journey</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                </div>
            </div>
        );
    }
}

export default AboutSliderCard;