import React, { Component } from 'react';
import './profiletab.css';
import down from '../images/download.png';
class ProfileTab extends Component {
    state = {}
    render() {
        return (
            <div className="profileTabContainer">
                <div className="profileImage">
                    <img src={this.props.imgSRC} alt="" />
                </div>
                <div className="profileText">{this.props.profileText}</div>
                <div className="profileDownContainer">
                    <div className="profileDownButton">
                        <img src={down} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTab;