import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminOrderCard.css';

class AdminOrderCard extends React.PureComponent{

    static propTypes = {
      info:PropTypes.object.isRequired,//получено от родителя
    };

    orderClickedClose = (EO) => {
      clickEvents.emit('EVOrderClickClose');
    }

    orderClickedPrint = () => {
      window.print();
    }

    render() { 
    let products=this.props.info.products.map((v,i) => <p key={i}>{v.product.name+' - '+v.count}</p>);
   
      return (
      <Fragment>  
      <div className='OrderCard'>
        <h3 className='NameOrderCard'><span> Заказ № </span>{this.props.info.id}</h3>
        <table>
          <tbody>
            <tr>
              <td className='HelpName'>ФИО клиента</td>
              <td className='Name'>{this.props.info.famClient+' '+this.props.info.nameClient+' '+this.props.info.otchClient}</td>
            </tr>

            <tr>
              <td className='HelpName'>Телефон</td>
              <td className='PhoneClient'>{this.props.info.phoneClient}</td>
            </tr>

            <tr>
              <td className='HelpName'>E-mail</td>
              <td className='EmailClient'>{this.props.info.emailClient}</td>
            </tr>

            <tr>
              <td className='HelpName'>Получатель заказа</td>
              <td className='WhoGets'>{this.props.info.whoGets==='Client'?'Сам клиент':'Адресат'}</td>
            </tr>

            {(this.props.info.whoGets!=='Client')&&
            <Fragment>
            <tr>
              <td className='HelpName'>ФИО получателя</td>
              <td className='NameRecipient'>{this.props.info.famRecipient+' '+this.props.info.nameRecipient+' '+this.props.info.otchRecipient}</td>
            </tr>

            <tr>
              <td className='HelpName'>Телефон получателя</td>
              <td className='PhoneRecipient'>{this.props.info.phoneRecipient}</td>
            </tr>
            </Fragment>
            }

            <tr>
              <td className='HelpName'>Вариант доставки</td>
              <td className='VariantDelivery'>{this.props.info.variantDelivery==='pickup'?'Самовывоз':'Доставка курьером'}</td>
            </tr>
            
            {(this.props.info.variantDelivery!=='pickup')&&
            <Fragment>
            <tr>
              <td className='HelpName'>Дата доставки</td>
              <td className='DateDelivery'>{this.props.info.date}</td>
            </tr>

            <tr>
              <td className='HelpName'>Время доставки</td>
              <td className='TimeDelivery'>{'c '+this.props.info.timeFrom+' по '+this.props.info.timeTo}</td>
            </tr>

            <tr>
              <td className='HelpName'>Адрес</td>
              <td className='Adress'>{this.props.info.adress}</td>
            </tr>
            </Fragment>
            }

            <tr>
              <td className='HelpName'>Что указать в открытке</td>
              <td className='Description'>{this.props.info.description}</td>
            </tr>

            <tr>
              <td className='HelpName'>Комментарий к заказу</td>
              <td className='Comment'>{this.props.info.comment}</td>
            </tr>

            <tr>
              <td className='HelpName'>Товары</td>
              <td className='Products'>{products}</td>
            </tr>

            <tr>
              <td className='HelpName'>Стоимость</td>
              <td className='Price'>{this.props.info.price}<span> pуб.</span></td>
            </tr>

            <tr>
              <td className='HelpName'>Способ оплаты</td>
              <td className='Oplata'>{this.props.info.oplata==='kart'?'карта':'наличные'}</td>
            </tr>
            
          </tbody>
        </table>
        <input type='button' value='Распечатать' onClick={this.orderClickedPrint}/>
        <input type='button' value='Закрыть' onClick={this.orderClickedClose}/>
        
      </div> 
      <div className='SignLine'>
          <div>Подпись продавца<div className='lineForSign'></div></div>
          <div>Подпись клиента(адресата)<div className='lineForSign'></div></div>
      </div> 
      </Fragment>              
    );
    
    }
  
  }
  export default AdminOrderCard;