import React, { Component } from 'react';
import './addonservicecard.css';
class AddOnserviceCard extends Component {
    state = {}
    render() {
        return (
            <div className="addOnServiceCardContainer">
                <div className="addOnServiceSlides">
                    <div className="slidesSection">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOnserviceCard;