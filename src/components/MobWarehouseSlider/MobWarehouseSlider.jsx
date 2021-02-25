/* eslint-disable */
import React, { Component } from 'react';
import './mobwarehouseslider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from '../images/banner/slider1.jpg';
import Slider2 from '../images/banner/slider2.jpg';
import Slider3 from '../images/banner/slider4.jpg';
import "./mobwarehouseslider.css"
import rightArrow from '../images/rightArrow.png';
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="rightArrowContainer"
            onClick={onClick}
        >
            <div className="rightButton">
                <img src={rightArrow} alt="" />
            </div>
        </div>
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
        />
    );
}
class MobWarehouseSlider extends Component {
    state = {}

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            focusOnSelect: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="MobSliderContainer">
                <div className="adjustSlider">
                    <Slider {...settings}>
                        {this.props.children}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default MobWarehouseSlider;