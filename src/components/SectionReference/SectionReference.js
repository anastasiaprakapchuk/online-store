import React from 'react';
import PropTypes from 'prop-types';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from '../Product/Product';
import './SectionReference.css';

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

class SectionReference extends React.Component {

  static propTypes = {
      
    productNew:PropTypes.array.isRequired, 
      //от родителя
    
    productTop:PropTypes.array.isRequired, 
       //от родителя
   
  };

    state ={
      classNameArrowLeft:'arrowLeftHidden',
      classNameArrowRight:'arrowRightHidden',
      products:this.props.productNew,
      indicateNew:'black',
      indicateTop:'green'
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

    clickNewProducts = ()=>{
      this.setState({
        products:this.props.productNew,
        indicateNew:'black',
        indicateTop:'green'
      });
    }

    clickTopProducts = ()=>{
      this.setState({
        products:this.props.productTop,
        indicateNew:'green',
        indicateTop:'black'
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
    
    var products=this.state.products.map((v)=>{
     
      return (<div key={v.code} > 
      <Product info={v}/> </div>);
    });

   
    return (
      <div className='sectionReference' onMouseEnter={this.hoverArrow} onMouseLeave={this.offHoverArrow}>
          <div className='sectionName'>Наши рекомендации</div>
          <div className='sectionNameParts'>
              <div className='sectionNamePartsOne' onClick={this.clickNewProducts} style={{backgroundColor:this.state.indicateNew}}>Новинки</div>
              <div className='sectionNamePartsTwo' onClick={this.clickTopProducts} style={{backgroundColor:this.state.indicateTop}}>Хиты продаж</div>
          </div>
         
          <Slider {...settings} className='Slider'>
              {products}
          </Slider>
         
      </div>
        
    );
  }
 }


export default SectionReference;  