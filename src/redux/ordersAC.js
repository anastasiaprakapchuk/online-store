const ORDERS_LOADING='ORDERS_LOADING';
const ORDERS_ERROR='ORDERS_ERROR';
const ORDERS_SET='ORDERS_SET';
const DELETE_ORDER_FROM_ORDERS='DELETE_ORDER_FROM_ORDERS';

const ordersLoadingAC=function() {
  return {
    type: ORDERS_LOADING,
  };
}

const ordersErrorAC=function() {
  return {
    type: ORDERS_ERROR,
  };
}

const ordersSetAC=function(data) {
  return {
    type: ORDERS_SET,
    orders:data.orders,
  };
}

const deleteOrderFromOrders=function(id) {
  return {
    type: DELETE_ORDER_FROM_ORDERS,
    idDeleteOrder:id,
  };
}

export {
  ordersLoadingAC,ORDERS_LOADING,
  ordersErrorAC,ORDERS_ERROR,
  ordersSetAC,ORDERS_SET,
  deleteOrderFromOrders,DELETE_ORDER_FROM_ORDERS,
}
