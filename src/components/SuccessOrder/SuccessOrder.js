import React, { Fragment } from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import './SuccessOrder.css';
import './SuccessOrder_media.css';
import order from './order.jpg';

class SuccessOrder extends React.PureComponent{

  static propTypes = {
    order:PropTypes.object.isRequired, // передано от родителя
  };


  backTop = ()=>{
    this.props.history.push("/");
    //document.location.reload();
  }

  render() { 
    
      return  (
        
        <div className='successOrder'>
          <div className='successOrderInfo'>
        <div className='numberOrder'>{` заказ № ${this.props.order.id}`}</div> 
        <p> успешно принят!</p>

        {this.props.order.variantDelivery==='courier'
        ?<Fragment>
        <p>{`Дата доставки: ${this.props.order.date}`}</p>
        <p>{`Время доставки: с ${this.props.order.timeFrom} по ${this.props.order.timeTo}`}</p>
        </Fragment>
        : 
          <p>{`Ваш заказ будет готов в течении 1 дня. 
          Мы дополнительно уведомим Вас о готовности  
          по указанному email или телефону`}</p>
          }

          <p>{`Стоимость: ${this.props.order.price} руб.`}</p>
          <p>{`Спасибо, что выбрали нас!`}</p>
          <button className='successcheckout' onClick={this.backTop}>
             Перейти на главную
            </button>
            </div>
            <div className='successOrderView'>
                <img src={order}></img>
            </div>
        </div>
       
       
      );
    }
   }
  
  export default withRouter( SuccessOrder ) ;