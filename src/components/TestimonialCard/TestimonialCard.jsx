import React, { Component } from 'react';
import './testimonialcard.css';
// import Amenitiescard from '../AmenitiesCard/AmenitiesCard';
// import fire from '../images/icon/fire.png';
// import hygiene from '../images/icon/hygiene.png';
// import parking from '../images/icon/parking.png';
// import professions from '../images/icon/professions.png';

// import toiletries from '../images/icon/toiletries.png';
// import valet from '../images/icon/valet.png';
// import workhome from '../images/icon/workhome.png';
class TestimonialCard extends Component {
    state = {}
    render() {
        return (
            <div className="testimonialCardContainer">
                {this.props.children}
            </div>
        );
    }
}

export default TestimonialCard;