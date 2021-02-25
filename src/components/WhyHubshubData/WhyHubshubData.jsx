import React, { Component } from 'react';
import './whyhubshubdata.css';
class WhyHubshubData extends Component {
    state = {
    }
    render() {
        return (
            <div className={"whyHubshubSection " + this.props.className}>
                <div className="Text">{this.props.text}</div>
                {this.props.children}
            </div>
        );
    }
}

export default WhyHubshubData;