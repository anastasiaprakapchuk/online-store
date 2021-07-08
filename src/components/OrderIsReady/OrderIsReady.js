import React from 'react';
import PropTypes from 'prop-types';
import { faAngleLeft,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './OrderIsReady.css';

class OrderIsReady extends React.Component {
  static propTypes ={
    allData:PropTypes.object.isRequired,//из сети
    order:PropTypes.object.isRequired,//от родителя
  };

  state = {
    orders:this.props.allData.orders,
    productList:this.props.allData.productList,
  };


  render (){
   if(this.props.order){
    return (
      <div >
        
      </div>
        
    );
   } return null;
  }
  }

export default OrderIsReady;  