import React, { Component } from 'react';
import './cardview.css';
import whiteArrow from '../images/whiteArrow.png';
import eye from '../images/eye.png';
class CardView extends Component {
    state = {}
    render() {
        return (
            <div className={"cardViewContainer " + this.props.className}>
                <div className="cardImage">
                    <img src={this.props.imgSRC} alt="" />
                </div>
                <div className="cardBottomContainer">
                    <div className="cardText">
                        <div>Jhons warehouse</div>
                        <div>Maharashtra</div>
                    </div>
                    {this.props.whiteArrow && <div className="rightArrowContainer">
                        <div className="rightButton">
                            <img src={whiteArrow} alt="" />
                        </div>
                    </div>}
                    {this.props.eye && <div className="eyeContainer">
                        <div className="eyeButton">
                            <img src={eye} alt="" />
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default CardView;