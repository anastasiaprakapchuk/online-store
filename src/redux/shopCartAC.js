
const ADD_IN_SHOPCART = 'ADD_IN_SHOPCART';
const DELETE_IN_SHOPCART = 'DELETE_IN_SHOPCART';
const DELETE_ALL_IN_SHOPCART = 'DELETE_ALL_IN_SHOPCART';

const add_in_shopcart = function (product, count) {
  return {
    type: ADD_IN_SHOPCART,
    infoProduct: product,
    count:count,
  };
}

const delete_in_shopcart = function (product,count) {
  return {
    type: DELETE_IN_SHOPCART,
    infoProduct: product,
    count:count,
  };
}

const delete_all_in_shopcart = function () {
  return {
    type: DELETE_ALL_IN_SHOPCART,
  };
}

export {
  add_in_shopcart, ADD_IN_SHOPCART,
  delete_in_shopcart, DELETE_IN_SHOPCART,
  delete_all_in_shopcart, DELETE_ALL_IN_SHOPCART,
}
