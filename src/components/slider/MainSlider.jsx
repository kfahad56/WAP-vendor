import React, { Component } from 'react';
import './mainslider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from '../images/banner/slider1.jpg';
import Slider2 from '../images/banner/slider2.jpg';
import Slider3 from '../images/banner/slider4.jpg';
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
class MainSlider extends Component {
    state = {}

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            focusOnSelect: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="MainSliderContainer">
                <div className="adjustSlider">
                    <Slider {...settings}>
                        <div className="imageContainer">
                            <img src={Slider1} alt="" />
                        </div>
                        <div className="imageContainer">
                            <img src={Slider2} alt="" />
                        </div>
                        <div className="imageContainer">
                            <img src={Slider3} alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default MainSlider;