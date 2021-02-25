import React, { Component } from 'react';
import './cardslider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardView from '../CardView/CardView';
import rightArrow from '../images/rightArrow.png';
import card1 from '../images/card1.png';
import card2 from '../images/ind1.png';
import card3 from '../images/ind1.png';
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="rightContainer2"
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
class CardSlider extends Component {
    state = {}
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="cardSliderContainer">
                <Slider {...settings}>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card1} />
                    </div>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card2} />
                    </div>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card3} />
                    </div>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card1} />
                    </div>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card2} />
                    </div>
                    <div>
                        <CardView whiteArrow={true} imgSRC={card3} />
                    </div>
                </Slider>
            </div>
        );
    }
}

export default CardSlider;