import React, { Fragment } from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { delete_all_in_shopcart } from '../../redux/shopCartAC';
import { deleteOrderFromListProd } from '../../redux/listProdAC';
import SuccessOrder from '../SuccessOrder/SuccessOrder';
import {saveOrderEvents} from '../../events';
import memoize from 'memoizee';
import './Cart.css';
import './Cart_media.css';


import CartProduct from '../CartProduct/CartProduct';
import FormOrder from '../FormOrder/FormOrder';


class Cart extends React.PureComponent{

  static propTypes = {
    shopCart:PropTypes.object.isRequired, // передано из Redux
  };

  state={
    formClass:'formIsHidden',
    workModeProduct:this.cart,
    view:'cart',
    order:null,
  };

  order='order';
  cart='cart';
  refForm=null;
  refButtonOrder=null;

  setRefForm =(ref)=>{
    this.refForm=ref;
  }

  setRefButtonOrder =(ref)=>{
    this.refButtonOrder=ref;
  }

  componentDidMount =()=>{
    saveOrderEvents.addListener('EVSuccessSaveOrder', this.changeView);
  }

  componentWillUnmount =()=>{
    saveOrderEvents.removeListener('EVSuccessSaveOrder', this.changeView);
  }

  changeView = (order)=>{
     this.props.dispatch( deleteOrderFromListProd(order.products) ); 
     this.props.dispatch( delete_all_in_shopcart() ); 
     this.setState({
       view:'successOrder',
       order:order,
     });
     
  }

  continueShopping = () =>{
    this.props.history.push("/catalog");
  }

  checkout = () =>{
    this.refForm.style.height='auto';
    this.refForm.style.position='';
    this.refForm.style.visibility='';
    window.scrollBy(0,this.refButtonOrder.offsetTop);
  }


  render() { 
    console.log('render Cart');

 
    if(this.props.shopCart.products.length===0){
      return(
       
        
        (this.state.view==='successOrder')?
         <SuccessOrder order={this.state.order}/>
         :<div className='Cart'>
            Товаров в корзине нет
            <button className='continueShopping' onClick={this.continueShopping}>
             Продолжить покупки
            </button>
        </div>
        
      );
    }else{
      let listProdinCartShop=this.props.shopCart.products.map( product => <CartProduct key={product.product.code} product={product.product} count={product.count} workModeProduct={this.state.workModeProduct}/>);
      let totalAmount=0;
      this.props.shopCart.products.forEach(v => {totalAmount+=(parseFloat(v.product.saleprice||v.product.price)*v.count)});
      let headCartShop= (<div className='headCartShop'>
      <div className='headItem headItemFoto'>
        Фото
      </div>
      <div className='headItem headItemName'>
        Наименование
      </div>
      <div className='headItem headItemPrice'>
        Цена за 1 шт.
      </div>
      <div className='headItem headItemCount'>
        Количество  
      </div>
      <div className='headItem headItemTotalPrice'>
        Сумма
      </div>
      <div className='headItem headItemDelete'>
        Удалить товар
      </div>
  </div>);
      let total= (<div className='totalAmount'>
      <div className='totalAmountItem totalAmountItemFoto'>
        
      </div>
      <div className='totalAmountItem totalAmountItemName'>
       
      </div>
      <div className='totalAmountItem totalAmountPrice'>
        
      </div>
      <div className='totalAmountItem totalAmountItemCount'>
        Общая сумма: 
      </div>
      <div className='totalAmountItem Price totalAmountItemTotalPrice'>
      {`${totalAmount} руб.`}
      </div>
      <div className='totalAmountItem totalAmountItemDelete'>
        
      </div>
  </div>);
      
      return  (
    
        
      <div className='CartAndForm'>
      <h3>Корзина товаров</h3>
        <div className='Cart'>
            <div className='listProdinCartShop' >
              {headCartShop}
              {listProdinCartShop}
              {total}
            </div>

            <button className='continueShopping' onClick={this.continueShopping}>
             Продолжить покупки
            </button>
            
            <button className='checkout' onClick={this.checkout} ref={this.setRefButtonOrder}>
             Оформить заказ
            </button>
            
        </div>
        <div className={this.state.formClass} ref={this.setRefForm}>
          <FormOrder price={totalAmount} cartProducts={this.props.shopCart.products}/>
        </div>
        
      </div>
     
      );
    }
   }
  }

  const mapStateToProps = function (state) {
    return {   
      shopCart: state.shopCart,      
    };
  };
  
  export default withRouter( connect(mapStateToProps)(Cart) );