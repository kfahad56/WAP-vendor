import React, { Component } from 'react';
import './backbutton.css';
class BackButton extends Component {
    state = {}
    render() {
        return (
            <div className={"backButtonContainer " + this.props.className} onClick={this.props.onClick}>
                <div className="backArrow fas fa-chevron-left"></div>
                <div className="backText">Back</div>
            </div>
        );
    }
}

export default BackButton;