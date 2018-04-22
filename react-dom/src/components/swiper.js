import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router";
import "../assets/css/swiper.css";
export default class Carousel extends React.Component{
    componentDidMount(){

        var mySwiper = new Swiper ($('.swiper-container')[0], {
                direction: 'horizontal',
                autoplay:2000,
                loop:true,
                autoplayDisableOnInteraction : false,
                pagination: '.swiper-pagination'
        }) 
    }
    render(){
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img id="img" src="src/assets/images/banner1.png"/></div>
                    <div className="swiper-slide"><img id="img" src="src/assets/images/banner2.png"/></div>
                    <div className="swiper-slide"><img id="img" src="src/assets/images/banner3.jpg"/></div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}