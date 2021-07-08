import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './SectionInfo.css';

export class SectionInfo extends React.PureComponent {
  static propTypes ={
    imagesInfo:PropTypes.object.isRequired,//получено от родителя
  };

  state = {
    appearBanner:0,
  };

  arrow=null;
 
  setArrow = (ref)=>{
    this.arrow=ref;
  }

  hoverArrow = ()=>{
    if(this.arrow)
    this.arrow.className='arrowAppear';
  }

  offHoverArrow = ()=>{
    if(this.arrow)
    this.arrow.className='arrowHidden';
  } 

  clickLeftArrow = () =>{
    let newBanner=this.state.appearBanner;
    if(this.state.appearBanner!==0)
    newBanner-=1;
    else
    newBanner=this.props.imagesInfo.data.length-1;
    this.setState({
      appearBanner:newBanner,
    });
  }

  clickRightArrow = () =>{
    let newBanner=this.state.appearBanner;
    if(this.state.appearBanner!==(this.props.imagesInfo.data.length-1))
    newBanner+=1;
    else
    newBanner=0;
    this.setState({
      appearBanner:newBanner,
    });
  }


  render (){
    //console.log(this.props.imagesInfo);
    let banners=this.props.imagesInfo.data.map((v,i)=>
    <div className={i===0?'bannerOne':'banner'} style={(i===this.state.appearBanner)?{opacity:'1'}:{opacity:'0'}} 
    key={i}><img src={v} alt=''></img></div>
    );
    return (
      <div className='sectionBanners' onMouseEnter={this.hoverArrow} onMouseLeave={this.offHoverArrow}>
        
        {banners}

        <div className='arrowHidden' ref={this.setArrow}>
           <div className="arrow arrowLeft" onClick={this.clickLeftArrow}> <FontAwesomeIcon icon={faAngleLeft}/> </div>
           <div className="arrow arrowRight" onClick={this.clickRightArrow}> <FontAwesomeIcon icon={faAngleRight}/> </div>
        </div>
        
      </div>
        
    );
  }
  }
  const mapStateToProps = function (state) {
    return {   
      imagesInfo: state.imagesInfo,      
    };
  };

export default connect(mapStateToProps)(SectionInfo);  