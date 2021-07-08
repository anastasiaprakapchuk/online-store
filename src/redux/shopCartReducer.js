import { ADD_IN_SHOPCART, DELETE_IN_SHOPCART, DELETE_ALL_IN_SHOPCART } from './shopCartAC';

const initState={
  products: [],
}

function shopCartReducer(state=initState,action) {
  switch (action.type) {
   
    case ADD_IN_SHOPCART: {
      let s=state.products.findIndex(v=>v.product.code===action.infoProduct.code);
      var newState={...state};
      if(action.count>0){
      //если не найден - просто добавляем товар
      if(s<0){
        newState={...state,
          products:[...state.products,{product:{...action.infoProduct,count:(action.infoProduct.count-action.count)}, count:action.count}],          
        };
      //если найден и count в корзине меньше сount товара - увеличиваем количество
      }else{
        var scount=state.products[s].product.count;//осталось товара
        var kcount=state.products[s].count//количество товара в корзине
        if(action.count<=scount){        
            state.products.splice(s,1,{product:{...action.infoProduct,count:(scount-action.count)}, count:(kcount+action.count)});
            newState={...state,
                  products:state.products          
            };
        }
      }
      }
      return newState;
    }

    case DELETE_IN_SHOPCART: {
      let s=state.products.findIndex(v=>v.product.code===action.infoProduct.code);
      var newState={...state};
     
      if(s>=0){
        var scount=state.products[s].product.count;//осталось товара
        var kcount=state.products[s].count//количество товара в корзине
      if(kcount-action.count===0){
        state.products.splice(s,1);
        newState={...state,
          products:state.products          
        };
      }else if(kcount-action.count>0){       
        state.products.splice(s,1,{product:{...action.infoProduct,count:(scount+action.count)}, count:(kcount-action.count)});
        newState={...state,
          products:state.products          
        };
      }
     }
      return newState;
    }

    case DELETE_ALL_IN_SHOPCART: {
      state.products.splice(0,state.products.length);
      var newState={...state,
        products:state.products          
      };
      console.log('удалено из корзины '+newState);
      return newState;
    }

    default:
      return state;
  }
}

export default shopCartReducer;
