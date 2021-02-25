/* eslint-disable */
import React, { Component } from 'react';
import './videobox.css';
// import video from '../../components/images/warehouse2.png';
// import play from '../../components/images/play-button.png';
class VideoBox extends Component {
    state = {}
    render() {
        return (
            <div className={"videoBoxContainer " + this.props.className}>
                <div className="videoText">{this.props.videoHeading}</div>
                <div className="videoSection">
                    <div className="videoImage">
                        <iframe  src="https://www.youtube.com/embed/FtPLY0HbNgc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    {/* <div className="playbutton">
                        <img src={play} alt="" />
                    </div> */}
                </div>
            </div>
        );
    }
}

export default VideoBox;