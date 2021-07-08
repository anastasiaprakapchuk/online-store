import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import { add_in_shopcart } from '../../redux/shopCartAC';

import './Product.css';
import './Product_media.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";


export class Product extends React.PureComponent{

    static propTypes ={ 
      info:PropTypes.object.isRequired,//от родителя
      workMode:PropTypes.string,//от родителя
    };

    state = {
      hoverImg:"",
      hoverOption:"",
      clickShoppingBag:false,//был ли клик "Добавить в корзину"?
      clickHeart:false,//был ли клик "Добавить в избранное"?
    };

    imgProd=null;
    optionProd=null;

    setImgRef = (ref) => {
        this.imgProd=ref;
    }

    setOptionRef = (ref) => {
        this.optionProd=ref;
    }

    changeView = (EO) =>{
     // EO.stopPropagation();
        if (this.imgProd&&this.optionProd){
          this.setState({
            hoverImg:" ViewProdScale",
            hoverOption:" OptionsProdAppear",
          });
        }
    }

    changeViewBack = (EO) => {
     // EO.stopPropagation();
      if (this.imgProd&&this.optionProd){
        this.setState({
          hoverImg:"",
          hoverOption:"",
        });
      }
    }

    clickShoppingBag = (EO) => {
      EO.stopPropagation();      
      this.props.dispatch( add_in_shopcart(this.props.info,1) );     
      this.setState({
        clickShoppingBag:true,
      });
    }

    clickHeart = (EO) => {
      console.log(EO);
      EO.stopPropagation();
      this.setState({
        clickHeart:true,
      });
     
    }

    clickProduct = () => {
       this.props.history.push("/productCard/"+this.props.info.code);
       window.scrollTo(0,0);
    }

    clickReply = (EO) => {
       EO.stopPropagation();
       this.props.history.push("/favorites");
       window.scrollTo(0,0);
    }

    stopPropagation =(EO) =>{
      EO.stopPropagation();
      console.log('куку');
    }
   
    render() {
      //console.log('render Product'+this.props.info.code);
      let productDefault=(
      <div className='Product' onMouseEnter={this.changeView} onMouseLeave={this.changeViewBack} onTransitionEnd={this.stopPropagation} onClick={this.clickProduct}>
        <div className="Fon">
          <img className={'ViewProd'+this.state.hoverImg} src={this.props.info.view} ref={this.setImgRef}/>
          <div className={'OptionsProd'+this.state.hoverOption} ref={this.setOptionRef}>
             <div><FontAwesomeIcon className='icons' title='Добавить товар в избранные' icon={this.state.clickHeart?faReply:faHeart} onClick={this.state.clickHeart?this.clickReply:this.clickHeart}/></div>
             <div><FontAwesomeIcon className='icons' title='Добавить товар в корзину' icon={this.state.clickShoppingBag?faCheck:faShoppingBag} onClick={this.clickShoppingBag}/></div>
          </div> 
        </div>
                    
        <p className='NameProd'>{this.props.info.name}</p>
        {this.props.info.sale?
            <div><p className='PriceProdListDelete'>{this.props.info.price}</p>
            <p className='PriceProdList'>{this.props.info.saleprice}</p></div>
            :<p className='PriceProdList'>{this.props.info.price}</p>}
            
      </div> 
      );

      let productForViewLargeIcons=productDefault;

      let productForViewList=(
        <div className='ProductList' onMouseEnter={this.changeView} onMouseLeave={this.changeViewBack} onTransitionEnd={this.stopPropagation} onClick={this.clickProduct}>
          <div className="FonList">         
              <img className={'ViewProdList'+this.state.hoverImg} src={this.props.info.view} ref={this.setImgRef}/>                                      
          </div>

          <div className='descriptionList'>
               <p className='NameProdList'>{this.props.info.name}</p>
            {this.props.info.sale?
            <div><p className='PriceProdListDelete'>{this.props.info.price}</p>
            <p className='PriceProdList'>{this.props.info.saleprice}</p></div>
            :<p className='PriceProdList'>{this.props.info.price}</p>}
               <p className='DescriptionProdList'>{this.props.info.description}</p>
          </div>
         
          <div className='OptionsProdList' ref={this.setOptionRef}>
                <div><FontAwesomeIcon className='icons iconAddInWish' size='2x' title='Добавить товар в избранные' icon={this.state.clickHeart?faReply:faHeart} onClick={this.state.clickHeart?this.clickReply:this.clickHeart}/></div>
                <div><FontAwesomeIcon className='icons iconAddInCart' size='2x' title='Добавить товар в корзину' icon={this.state.clickShoppingBag?faCheck:faShoppingBag} onClick={this.clickShoppingBag}/></div>
          </div>
                                                                      
        </div> 
        );

      if(this.props.workMode==='viewLargeIcons'){   
         return productForViewLargeIcons;
      } if(this.props.workMode==='viewList'){   
         return productForViewList;
      } else{
         return productDefault;  
      }
    }
  
  }
  
  export default withRouter(connect()(Product));

  