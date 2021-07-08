import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Counter from '../Counter/Counter';
import { add_in_shopcart, delete_in_shopcart } from '../../redux/shopCartAC';
import './CartProduct.css';
import './CartProduct_media.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class CartProduct extends React.PureComponent{

    static propTypes ={ 
      product:PropTypes.object.isRequired,//от родителя
      count:PropTypes.number.isRequired,//от родителя
    };

    state = {
      classProd:'',
    };

    refCount=null;
    classProd=null;
    
    setRefCount= (ref)=>{
      this.refCount=ref;
    }

    setRefClassProd= (ref)=>{
      this.classProd=ref;
    }

    deleteProductItem = () =>{
      console.log(this.classProd); 
          this.setState({classProd:'hidden'});
      
    }

    deleteItem = ()=>{
      this.props.dispatch( delete_in_shopcart(this.props.product, this.props.count) );
      this.setState({classProd:''});
    }



    render() {
      let currPrice=this.props.product.sale?this.props.product.saleprice:this.props.product.price;
      console.log('render CartProd'+this.props.product.code);
      console.log('render CartProd с '+this.state.classProd);
      return(
        <div className={'CartProduct '+this.state.classProd} ref={this.setRefClassProd} onAnimationEnd={this.deleteItem}>
            <div className='CartProductItem CartProductItemFoto' >
              <img src={this.props.product.view}></img> 
            </div>
            <div className='CartProductItem CartProductItemName'>
              <span>{this.props.product.name}</span> 
            </div>
            <div className='CartProductItem CartProductItemPrice'>
           
            <span>{currPrice}</span>
            
            </div>
            <div className='CartProductItem CartProductItemCounter'>
               <Counter key={this.props.product.code} info={this.props.product} defaultCount={this.props.count}/>
            </div>
            <div className='CartProductItem CartProductItemTotalPrice'>
              <span>{(parseFloat(currPrice)*this.props.count).toFixed(2)+' руб.'}</span> 
            </div>
            <div className='CartProductItem CartProductItemDelete'>
                 <div className='DeleteProductItem' onClick={this.deleteProductItem}>
                   <FontAwesomeIcon icon={faTrashAlt} color="grey" size='2x'/>
                 </div>                 
            </div>
        </div>
      );
    }
  
  }


  export default connect()(CartProduct);