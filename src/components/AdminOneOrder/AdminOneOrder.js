import React from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminOneOrder.css';

class AdminOneOrder extends React.Component{

    static propTypes = {
      info:PropTypes.object.isRequired,//получено от родителя
    };

    orderClickedMoreDetails = (EO)=> {
      clickEvents.emit('EVOrderClickMoreDetails', this.props.info.id);
    }

    orderClickedDelete = (EO)=> {
     clickEvents.emit('EVOrderClickDelete', this.props.info.id);
    }

    render() { 
     
      return (
      <tr className='OrderOne'>
        <td className='Id'>{this.props.info.id}</td>
        <td className='Name'>{this.props.info.famClient+' '+this.props.info.nameClient}</td>
        <td className='PhoneClient'>{this.props.info.phoneClient}</td>
        <td className='Price'>{this.props.info.price}<span> pуб.</span></td>
        <td className='MoreDetails'><input type='button' value='Подробнее' onClick={this.orderClickedMoreDetails}/></td>
        <td className='Delete'><input type='button' value='Удалить' onClick={this.orderClickedDelete}/></td>
      </tr>                
    );
    
    }
  
  }
  export default AdminOneOrder;