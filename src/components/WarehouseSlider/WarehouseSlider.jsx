import React, { Component } from 'react';
import './warehouseslider.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import rightArrow from '../images/rightArrow.png';
class WarehouseSlider extends Component {
    state = {}
    render() {
        return (
            <div className="warehouseSliderContainer">
                <Carousel
                    infiniteLoop
                    showArrows={true}
                    showStatus={true}
                    showIndicators={false}
                    showThumbs={true}
                    interval={3000}
                    transitionTime={1000}
                    stopOnHover={false}
                    // centerMode
                    // centerSlidePercentage={number('centerSlidePercentage', 80, {}, mainGroupId)}
                >
                    {this.props.children}
                </Carousel>
            </div >
        );
    }
}

export default WarehouseSlider;