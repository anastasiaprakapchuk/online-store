import React from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';
import {clickEvents} from '../../events';
import Counter from '../Counter/Counter';
import { add_in_shopcart } from '../../redux/shopCartAC';

import './CardProd.css';
import './CardProd_media.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

class CardProd extends React.PureComponent{

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
    shopCart:PropTypes.object,//получено из Redux
};

    state = {       
      addButtonDisable:false,//кнопка 'Добавить в корзину' доступна при false
    };

    addCart = () => {
      clickEvents.emit('EVAddInCart');
    }

    clickAddFavorit = () => {
      //описать событие добавление товара в favorit
    }

    render() { 
      console.log('renderCard'+this.props.info.code);
      var currentCount;
      if(this.props.shopCart.products.length>0){
      var s=this.props.shopCart.products.findIndex(product =>product.product.code===this.props.info.code);
      currentCount=(s!==-1)?(this.props.shopCart.products[s].product.count):(this.props.info.count);
      }else{
        currentCount=this.props.info.count;
      }
      return  (
        
        <div className='CardProd'>

          <div className='CardProdImg'>
             <img className='ImgCard' src={this.props.info.view} alt={'изображение не доступно'}/>   
          </div>

          <div className='CardProdInfo'>
            <div className='CardProdInfoTable'>
               <div className='CardProdInfoName'>{this.props.info.name}</div>

               {this.props.info.sale?
            <div><div className='CardProdInfoPriceDelete'>{this.props.info.price}</div>
            <div className='CardProdInfoPrice'>{this.props.info.saleprice}</div></div>
            :<div className='CardProdInfoPrice'>{this.props.info.price}</div>}

               <div className='CardProdInfoDescription'>{this.props.info.description}</div> 
               <div className='CardProdInfoCount'>
                 {this.props.info.count>0&&currentCount>0?
                 <span><FontAwesomeIcon icon={faCheckCircle} color="green"/> {`В наличии: ${currentCount}`}</span>:
                //  (this.props.info.expected?
                //   <span><FontAwesomeIcon icon={faClock} color="yelloy"/>Под заказ</span>:
                  <span><FontAwesomeIcon icon={faFrown} color="red"/>Нет в наличии</span>}
               </div> 
               
               <div className='CardProdInfoAddCart'>

                 <div className='ChoiseCount'>Выберите количество:</div>
                 <Counter info={this.props.info} defaultCount={0}/>

                 <button className='AddCart' onClick={this.addCart} disabled={this.state.addButtonDisable}>
                      Добавить в корзину
                 </button>
               </div>

               <div className='CardProdInfoAddFavorit' onClick={this.clickAddFavorit}>
                   <FontAwesomeIcon icon={faHeart} size='1x'/>
                   <span>Добавить в избранное</span>
               </div> 
            </div>              
          </div>

        </div>
      );
    }
  
  }

  const mapStateToProps = function (state) {
    return {   
      shopCart: state.shopCart,      
    };
  };

  export default connect(mapStateToProps)(CardProd);