import React from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminOrders.css';
import AdminOneOrder from '../AdminOneOrder/AdminOneOrder';
import AdminOrderCard from '../AdminOrderCard/AdminOrderCard';
import {saveDataForServer} from '../../redux/saveDataForServer';
import {deleteOrderFromOrders} from '../../redux/ordersAC';
import {connect} from 'react-redux';

class AdminOrders extends React.PureComponent{

    static propTypes = {
      orders: PropTypes.object.isRequired,//получено из Redux
    };

    state = {       
      cardOrderAppear:null,    
    };

    componentDidMount = ()=>{
      clickEvents.addListener('EVOrderClickDelete',this.orderOneDelete);
      clickEvents.addListener('EVOrderClickMoreDetails',this.orderOneMoreDetails);
      clickEvents.addListener('EVOrderClickClose',this.orderOneClose);
    }

    componentWillUnmount = ()=>{
      clickEvents.removeListener('EVOrderClickDelete',this.orderOneDelete);
      clickEvents.removeListener('EVOrderClickMoreDetails',this.orderOneMoreDetails);
      clickEvents.removeListener('EVOrderClickClose',this.orderOneClose);
    }

    orderOneDelete = (id)=> {
        console.log('удалена строка '+id);
        this.props.dispatch( deleteOrderFromOrders(id) ); 
        this.saveDeleteForServer(id);
    }

    orderOneMoreDetails = (id)=> {
      let cardOrderAppear=this.props.orders.data.find(v => v.id===id);
      this.setState({cardOrderAppear:cardOrderAppear});
    }

    orderOneClose = () => {
      this.setState({cardOrderAppear:null});
    }

    saveDeleteForServer = (id)=>{
      var newOrders=[...this.props.orders.data];
      var index=this.props.orders.data.findIndex(v => v.code===id);
      newOrders.splice(index,1); 
      var newState={...this.props.state,orders:{...this.props.state.orders,data:newOrders} };
      saveDataForServer(newState);
    }

    render() {
      var headCode=(
      <tr className='HeadOrders'>
        <td className='Id'>{'№ заказа'}</td>
        <td className='Name'>{'Имя клиента'}</td>
        <td className='PhoneClient'>{'Телефон'}</td>
        <td className='Price'>{'Стоимость'}</td>
        <td className='MoreDetails'>{'Подробнее'}</td>
        <td className='Delete'>{'Удалить'}</td>
      </tr>
      );

      var ordersCode=this.props.orders.data.map(v=>
        <AdminOneOrder key={v.id} info={v}/>
      );
      console.log(this.state.cardOrderAppear);
      
      return (
        this.props.orders.data.length===0?<h2 className='NameOrdersList'>Cписок заказов пуст</h2>:
      
      <div className='OrdersList'> 
        <h2 className='NameOrdersList'>Cписок заказов</h2>
        <div className='flexContainer'>
        <table className='TopOrderList'>
          <tbody>
             {headCode}
             {ordersCode}
              
          </tbody>
        </table>
        {this.state.cardOrderAppear?<div className={this.state.cardOrderAppear?'CardOrderAppear':''}>
          <AdminOrderCard info={this.state.cardOrderAppear}/></div>:null}
        </div>
      </div>
      
      );      
    }
  
  }



  
const mapStateToProps = function (state) {
  return {
    state:state,
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(AdminOrders);