import React from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';
import {clickEvents} from '../../events';
import { add_in_shopcart, delete_in_shopcart } from '../../redux/shopCartAC';

import './Counter.css';
import './Counter_media.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


class Counter extends React.PureComponent{

  static propTypes = {
    info:PropTypes.shape({
       code: PropTypes.number.isRequired,
       count: PropTypes.number.isRequired,
       name: PropTypes.string.isRequired,
       price: PropTypes.string.isRequired,
       view: PropTypes.string.isRequired,
       expected: PropTypes.number.isRequired,
       description: PropTypes.string.isRequired,
  }),//получено от родителя
    defaultCount:PropTypes.number.isRequired,
    shopCart:PropTypes.object,//получено из Redux
};

    state = {       
      disabledDec:false,//кнопка добавить недоступна?
      disabledInc:false,//кнопка отнять  недоступна?
    };

    refCount=null;

    setCount = (ref) =>{
       this.refCount=ref;
    }

    decCounter = () => {
      
      if(this.props.shopCart.products.length===0){
        if(this.refCount&&this.refCount.value<this.props.info.count)
        this.refCount.value=(parseInt(this.refCount.value)+1);
        
      }else{
        let s=this.props.shopCart.products.findIndex(product =>product.product.code===this.props.info.code);
        if(this.props.defaultCount===0){ 
          if(this.refCount&&this.refCount.value<((s!==-1)?this.props.shopCart.products[s].product.count:this.props.info.count)){
            this.refCount.value=(parseInt(this.refCount.value)+1);             
          }
          
        }  
          else if(this.props.defaultCount>0){
            if(this.refCount&&this.refCount.value<this.props.shopCart.products[s].count+this.props.shopCart.products[s].product.count){
              this.refCount.value=(parseInt(this.refCount.value)+1);
              this.props.dispatch( add_in_shopcart(this.props.info,1) );             
            }
            
          } 
      }  
    }

    incCounter = () => {
      if(this.props.defaultCount===0){
        if(this.refCount&&this.refCount.value>0){
          this.refCount.value=(parseInt(this.refCount.value)-1);
        }
       
      }
      else if(this.props.defaultCount>0){
        if(this.refCount&&this.refCount.value>1){
          this.refCount.value=(parseInt(this.refCount.value)-1);
          this.props.dispatch( delete_in_shopcart(this.props.info,1) );    
        }
       
      }
    }

    componentDidMount =() =>{
      clickEvents.addListener('EVAddInCart',this.addInCart);
    
    }

    componentWillUnmount =() =>{
      clickEvents.removeListener('EVAddInCart',this.addInCart);
     
    }

    addInCart =() =>{
     
        this.props.dispatch( add_in_shopcart(this.props.info,parseFloat(this.refCount.value)) ); 
        this.refCount.value=0;   
       
    }

    render() { 
     console.log('renderCounter '+ this.props.info.code);
      return  (
                 <div className='Counter'>
                    <button className='CountInc' onClick={this.incCounter}>
                      <FontAwesomeIcon icon={faAngleLeft} color="grey" size='1x'/>
                    </button>

                    <input className='Count' type='number' defaultValue={this.props.defaultCount}  ref={this.setCount}></input>  
                    
                    <button className='CountDec' onClick={this.decCounter}>
                      <FontAwesomeIcon icon={faAngleRight} color="grey" size='1x'/>
                    </button>

                 </div>              
      );
    }
  
  }

  const mapStateToProps = function (state) {
    return {   
      shopCart: state.shopCart,
    };
  };

  export default connect(mapStateToProps)(Counter);