const lISTPROD_LOADING='lISTPROD_LOADING';
const lISTPROD_ERROR='lISTPROD_ERROR';
const lISTPROD_SET='lISTPROD_SET';
const DELETE_ORDER_FROM_LISTPROD='DELETE_ORDER_FROM_LISTPROD';
const DELETE_PRODUCT_FROM_LISTPROD='DELETE_PRODUCT_FROM_LISTPROD';
const SAVE_PRODUCT_FROM_LISTPROD='SAVE_PRODUCT_FROM_LISTPROD';

const listProdLoadingAC=function() {
  return {
    type: lISTPROD_LOADING,
  };
}

const listProdErrorAC=function() {
  return {
    type: lISTPROD_ERROR,
  };
}

const listProdSetAC=function(data) {
  return {
    type: lISTPROD_SET,
    productList:data.productList,
  };
}

const deleteOrderFromListProd=function(productsInCart) {
  return {
    type: DELETE_ORDER_FROM_LISTPROD,
    productsInCart:productsInCart,
  };
}

const deleteProductFromListProd=function(id) {
  return {
    type: DELETE_PRODUCT_FROM_LISTPROD,
    productId:id,
  };
}

const saveProductFromListProd=function(product) {
  return {
    type: SAVE_PRODUCT_FROM_LISTPROD,
    newProduct:product,
  };
}

export {
  listProdLoadingAC,lISTPROD_LOADING,
  listProdErrorAC,lISTPROD_ERROR,
  listProdSetAC,lISTPROD_SET,
  deleteOrderFromListProd, DELETE_ORDER_FROM_LISTPROD,
  deleteProductFromListProd, DELETE_PRODUCT_FROM_LISTPROD,
  saveProductFromListProd, SAVE_PRODUCT_FROM_LISTPROD,
}
