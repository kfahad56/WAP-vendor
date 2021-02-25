import React, { Component } from 'react';
import './amenitiescard.css';
class AmenitiesCard extends Component {
    state = {}
    render() {
        return (
            <div className="amenitiesCard">
                <div className="amenitiesImage">
                    <img src={this.props.imgSRC} alt="" />
                </div>
                <div className="amenitiesTtext">{this.props.amenitiesTtext}</div>
            </div>
        );
    }
}

export default AmenitiesCard;