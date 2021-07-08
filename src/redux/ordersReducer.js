import { ORDERS_LOADING, ORDERS_ERROR, ORDERS_SET, DELETE_ORDER_FROM_ORDERS } from './ordersAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function ordersReducer(state=initState,action) {
  switch (action.type) {

    case ORDERS_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case ORDERS_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case ORDERS_SET: {
      let newState={
        status:3,
        data:action.orders,
      };
      return newState;
    }

    case DELETE_ORDER_FROM_ORDERS: {
      var newState;
      if (state.status===3){
        var newOrders=[...state.data];
        let index=state.data.findIndex(v => v.id===action.idDeleteOrder);
        newOrders.splice(index,1); 
        newState={...state,data:newOrders};       
      }
      return newState;
    }
    
    default:
      return state;
  }
}

export default ordersReducer;
