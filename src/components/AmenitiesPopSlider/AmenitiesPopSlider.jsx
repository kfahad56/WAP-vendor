import React, { Component } from 'react';
import './amenitiespopslider.css';
import rightArrow from '../images/rightArrow.png';
import AmenitiesPopupCard from '../AmenitiesPopupCard/AmenitiesPopupCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
class AmenitiesPopSlider extends Component {
    state = {}
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="amenitiesPopSliderContainer">
                <Slider {...settings}>
                    <div>
                        <AmenitiesPopupCard />
                    </div>
                    <div>
                        <AmenitiesPopupCard />
                    </div>
                    <div>
                        <AmenitiesPopupCard />
                    </div>
                </Slider>
            </div>
        );
    }
}

export default AmenitiesPopSlider;