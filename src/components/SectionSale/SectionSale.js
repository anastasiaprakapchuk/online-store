import React from 'react';
import PropTypes from 'prop-types';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from '../Product/Product';
import './SectionSale.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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


class SectionSale extends React.PureComponent {

  static propTypes = {
      
    productSale:PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        expected: PropTypes.number,
        price: PropTypes.string.isRequired,          
        view: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired, 
      }) //от родителя
    ),
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

  render (){
    
    const settings = {
      nextArrow: <SampleNextArrow class={this.state.classNameArrowRight}/>,
      prevArrow: <SamplePrevArrow class={this.state.classNameArrowLeft}/>,
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1           
          }
        }
      ]
    };
    
    var products=this.props.productSale.map((v)=>{
     
      return (<div key={v.code} > 
      <Product info={v}/> </div>);
    });
    return (
      <div className='sectionSale' onMouseEnter={this.hoverArrow} onMouseLeave={this.offHoverArrow}>
          <div className='sectionName'>Специальное предложение</div>
          
          <Slider {...settings} className='Slider'>
            {products}
          </Slider>
      </div>
        
    );
  }
  }

export default SectionSale;  