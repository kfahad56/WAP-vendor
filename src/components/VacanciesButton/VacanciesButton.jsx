import React, { Component } from 'react';
import './vacanciesbutton.css';
class VacanciesButton extends Component {
    state = {}
    render() {
        return (
            <div className="vacanciesButtonContainer">
                <div className="vacanciesHeadText">{this.props.headText}</div>
                <div className="viewMoredetails" onClick={this.props.onClick}>View more details</div>
            </div>
        );
    }
}

export default VacanciesButton;