import { combineReducers } from 'redux';

import listProdReducer from "./listProdReducer";
import infoImagesReducer from "./infoImagesReducer";
import contactsInfoReducer from "./contactsInfoReducer";
import ordersReducer from "./ordersReducer";
import optionsReducer from "./optionsReducer";
import shopCartReducer from "./shopCartReducer";

let combinedReducer=combineReducers({
    //данные с сервера:
    productList: listProdReducer, // с сервера список товаров
    imagesInfo:infoImagesReducer, //c cервера баннеры на главную страницу
    contactsInfo:contactsInfoReducer, // c сервера контактная информация
    orders: ordersReducer,//заказы - загружаю сразу с сервера, т.к. с сайтом может работать админ!
    //content: contentReducer, //c сервера
    
    // //корзина покупок:
    shopCart: shopCartReducer,//внутренние данные
    // //избранные товары:
    // productInFavorites: productInFavoritesReducer,//внутренние данные
    // //оформленный заказ:
    
    // //coстояние фильтров каталога покупателя:
    options:optionsReducer,//опции для каталога
    // + другие редьюсеры
});

export default combinedReducer;
