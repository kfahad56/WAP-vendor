import React, { Component } from 'react';
import './amenitiespopupcard.css';
import Amenitiescard from '../AmenitiesCard/AmenitiesCard';
import fire from '../images/icon/fire.png';
import hygiene from '../images/icon/hygiene.png';
import parking from '../images/icon/parking.png';
import professions from '../images/icon/professions.png';
import security from '../images/icon/security.png';
import toiletries from '../images/icon/toiletries.png';
import valet from '../images/icon/valet.png';
import workhome from '../images/icon/workhome.png';
class AmenitiesPopupCard extends Component {
    state = {}
    render() {
        return (
            <div className="amenitiesPopupCardContainer">
                <div className="slideSection">
                    <Amenitiescard imgSRC={security} amenitiesTtext="CCTV Survilance" />
                    <Amenitiescard imgSRC={valet} amenitiesTtext="Valet Parking" />
                    <Amenitiescard imgSRC={fire} amenitiesTtext="Fire Compliance" />
                    <Amenitiescard imgSRC={hygiene} amenitiesTtext="Daily Sanitization" />
                    <Amenitiescard imgSRC={professions} amenitiesTtext="24*7 Security Guard" />
                    <Amenitiescard imgSRC={toiletries} amenitiesTtext="Bathroom facility" />
                    <Amenitiescard imgSRC={workhome} amenitiesTtext="Office Station" />
                    <Amenitiescard imgSRC={parking} amenitiesTtext="Personal parking" />
                    <Amenitiescard imgSRC={security} amenitiesTtext="CCTV Survilance" />
                    <Amenitiescard imgSRC={valet} amenitiesTtext="Valet Parking" />
                    <Amenitiescard imgSRC={fire} amenitiesTtext="Fire Compliance" />
                    <Amenitiescard imgSRC={hygiene} amenitiesTtext="Daily Sanitization" />
                    <Amenitiescard imgSRC={professions} amenitiesTtext="24*7 Security Guard" />
                    <Amenitiescard imgSRC={toiletries} amenitiesTtext="Bathroom facility" />
                    <Amenitiescard imgSRC={workhome} amenitiesTtext="Office Station" />
                    <Amenitiescard imgSRC={parking} amenitiesTtext="Personal parking" />
                </div>
            </div>
        );
    }
}

export default AmenitiesPopupCard;