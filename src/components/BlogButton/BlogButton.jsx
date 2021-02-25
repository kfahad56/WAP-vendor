import React, { Component } from 'react';
import './blogbutton.css';
class BlogButton extends Component {
    state = {}
    render() {
        return (
            <div className={"blogButtonContainer " + this.props.className} onClick={this.props.onClick}>
                <div className="tagText">{this.props.tags}</div>
            </div>
        );
    }
}

export default BlogButton;