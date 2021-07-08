//import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SectionInfoSlider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={'arrow '+props.class}
      style={{ ...style }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleRight}/>
    </div>  
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={'arrow '+props.class}
      style={{ ...style }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleLeft}/>
    </div>  
  );
}

export class SectionInfoSlider extends Component {
  static propTypes ={
    imagesInfo:PropTypes.object.isRequired,//получено от родителя
  };

  state ={
    classNameArrowLeft:'arrowLeftHidden',
    classNameArrowRight:'arrowRightHidden',
  }

  hoverArrow = ()=>{
    this.setState({
      classNameArrowLeft:'arrowLeft',
      classNameArrowRight:'arrowRight',
    });
  }
    
  offHoverArrow = ()=>{
    this.setState({
      classNameArrowLeft:'arrowLeftHidden',
      classNameArrowRight:'arrowRightHidden',
    });
  } 

  render() {
    const settings = {
      nextArrow: <SampleNextArrow class={this.state.classNameArrowRight}/>,
      prevArrow: <SamplePrevArrow class={this.state.classNameArrowLeft}/>,
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    let banners=this.props.imagesInfo.data.map((v,i)=>
        <div  
        key={i}><img src={v} alt=''></img>
        </div>);

    return (
      <div className='sectionBanners' onMouseEnter={this.hoverArrow} onMouseLeave={this.offHoverArrow}>
        
        <Slider {...settings}>
           {banners}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {   
    imagesInfo: state.imagesInfo,      
  };
};

export default connect(mapStateToProps)(SectionInfoSlider);  
