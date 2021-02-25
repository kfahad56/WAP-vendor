/* eslint-disable */
import React, { Component } from 'react';
import './warehousecard.css';
// import top20 from '../images/top20.png';
import heart from '../images/heart.png';
// import heart from '../images/selectedHeart.png';
import whatsapp from '../images/whatsapp.png';
import mail from '../images/mail.png';
import whiteArrow from '../images/whiteArrow.png';
import { NavLink } from 'react-router-dom';
class WarehouseCard extends Component {
    state = {
        enquire: false
    }
    render() {
        return (
            <div className="warehouseCardContainer">
                <NavLink to={`/viewwarehouse/${this.props.data.warehouseVersionId}`}><div className="leftPart">
                    <div className="warehouseImage">
                        <img src={this.props.data.image.file} alt="" />
                    </div>
                    <div className="heartImageContainer">
                        <div className="heartImage">
                            <img src={heart} alt="" />
                        </div>
                    </div>
                </div></NavLink>
                <div className="rightPart">
                    <div className="dataTopContainer">
                        <h3>{this.props.data.name}</h3>
                        <div className="enquireButton" onClick={this.props.onClick}>
                            <div>Enquire</div>
                        </div>
                    </div>
                    <div className="secondText">{this.props.data.state}</div>
                    <div className="thirdPartContainer">
                        <div className="thirdText">Available Now</div>
                        <div className="thirdText">Rs {this.props.data.areaRate} / sq.ft</div>

                    </div>
                    <div className="fourtPartContainer">
                        <div className="shareText">SHARE</div>
                        <div className="whatsappImage">
                            <img src={whatsapp} alt="" />
                        </div>
                        <div className="mailImage">
                            <img src={mail} alt="" />
                        </div>
                        <NavLink to={`/viewwarehouse/${this.props.data.warehouseVersionId}`}>
                            <div className="rightArrowContainer">
                                <div className="rightButton">
                                    <img src={whiteArrow} alt="" />
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default WarehouseCard;