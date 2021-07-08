import { lISTPROD_LOADING, lISTPROD_ERROR, lISTPROD_SET, DELETE_ORDER_FROM_LISTPROD,
   DELETE_PRODUCT_FROM_LISTPROD, SAVE_PRODUCT_FROM_LISTPROD } from './listProdAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function listProdReducer(state=initState,action) {
  switch (action.type) {

    case lISTPROD_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case lISTPROD_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case lISTPROD_SET: {
      let newState={
        status:3,
        data:action.productList,
      };
      return newState;
    }

    case DELETE_ORDER_FROM_LISTPROD: {
      var newState;
      if (state.status===3){
        var newProductList=[...state.data];

        action.productsInCart.forEach(v => {
          let index=state.data.findIndex(s => v.product.code===s.code);
          let dell=newProductList.splice(index,1,v.product); 
          console.log(dell); 
        });

        newState={...state,data:newProductList};
        console.log('удалено из листа');        
      }
      return newState;
    }

    case DELETE_PRODUCT_FROM_LISTPROD: {
      var newState;
      if (state.status===3){
        var newProductList=[...state.data];
        var index=state.data.findIndex(v => v.code===action.productId);
        newProductList.splice(index,1); 
        newState={...state,data:newProductList};
        console.log('удалено из листа');        
      }
      return newState;
    }

    case SAVE_PRODUCT_FROM_LISTPROD: {
      var newState;
      if (state.status===3){
        var newProductList=[...state.data];
        var index=state.data.findIndex(v => v.code===action.newProduct.code);
        console.log(index);
        index!==-1
        ?newProductList.splice(index,1,action.newProduct)
        :newProductList.push(action.newProduct); 
        newState={...state,data:newProductList};
        console.log('продукт из листа изменен или добавлен новый');    
      }
      return newState;
    }
    
    default:
      return state;
  }
}

export default listProdReducer;
