import React, { Component } from 'react';
import './shortlistedcard.css';
import whiteArrow from '../images/whiteArrow.png';
import whatsapp from '../images/whatsapp.png';
import mail from '../images/mail.png';
import close from '../images/closeyellow.png';
class ShortlistedCard extends Component {
    state = {}
    render() {
        return (
            <div className="shortlistedCardContainer">
                <div className="closeContainer">
                    <div className="closeButton">
                        <img src={close} alt="" />
                    </div>
                </div>
                <div className="cardImage">
                    <img src={this.props.imgSRC} alt="" />
                </div>
                <div className="cardBottomContainer">
                    <div className="cardText">
                        <div>Jhons warehouse</div>
                        <div>Maharashtra</div>
                    </div>
                    <div className="rightArrowContainer">
                        <div className="rightButton">
                            <img src={whiteArrow} alt="" />
                        </div>
                    </div>
                </div>
                <div className="ShareContainer">
                    <div className="shareText">SHARE</div>
                    <div className="whatsappImage">
                        <img src={whatsapp} alt="" />
                    </div>
                    <div className="mailImage">
                        <img src={mail} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ShortlistedCard;