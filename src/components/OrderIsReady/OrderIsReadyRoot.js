import React from 'react';

import OrderIsReady from './OrderIsReady';
import { withDataLoad } from '../withDataLoad';

var password=Math.random();
var sp=new URLSearchParams();
  sp.append('f','LOCKGET');
  sp.append('n','PROBA_PROKOPCHUK_CURSPROJECT_SHOPFLOWER');
  sp.append('p',password);

class OrderIsReadyRoot extends React.PureComponent {

  fetchConfig={
    URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
    method: 'post',
    body:sp,
  };

  OrderIsReadyWithData=withDataLoad(this.fetchConfig,"allData")(OrderIsReady);

  render() {

    let OrderIsReadyWithData=this.OrderIsReadyWithData;
    return <OrderIsReadyWithData /> ;
  }

}

export default OrderIsReadyRoot;
