"use strict";

import React from 'react';
import Categories from '../components/Categories/Categories';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

let listProd= [{"category":"букеты из тюльпанов","name":"Букет из белых тюльпанов", "code":1, "count":4, "expected":0, "price":"65.00 руб.","sale":true,"saleprice":"55.00 руб.","new":false,"top":false, "view":"productsImages/white_tulips.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"}, 
{"category":"букеты из тюльпанов","name":"Букет из розовых тюльпанов", "code":2, "count":5, "expected":0, "price":"80.00 руб.","sale":true,"saleprice":"60.00 руб.","new":false,"top":false, "view":"productsImages/pink_tulips.jpg","description":"Букет состоит из 15 розовых тюльпанов, обернутых в крафтовую бумагу"}, 
{"category":"букеты из тюльпанов","name":"Букет из желтых тюльпанов", "code":3, "count":3, "expected":0, "price":"55.00 руб.", "sale":false,"saleprice":"","new":false,"top":false,"view":"productsImages/yellow_tulips.jpg","description":"Букет состоит из 12 желтых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет из фиолетовых тюльпанов", "code":4, "count":2, "expected":2, "price":"85.00 руб.", "sale":false,"saleprice":"","new":false,"top":true,"view":"productsImages/purple_tulips.jpg","description":"Букет состоит из 15 фиолетовых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет из красных тюльпанов", "code":5, "count":5, "expected":5, "price":"60.00 руб.","sale":false,"saleprice":"","new":false,"top":false, "view":"productsImages/red_tulips.jpg","description":"Букет состоит из 15 красных тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Maрсель\"", "code":6, "count":2, "expected":2, "price":"220.00 руб.", "sale":false,"saleprice":"","new":false,"top":false,"view":"productsImages/marseilles.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Теплая весна\"", "code":7, "count":2, "expected":4, "price":"130.00 руб.","sale":false,"saleprice":"","new":false,"top":true, "view":"productsImages/warm_spring.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Райское утро\"", "code":8, "count":3,"expected":3, "price":"310.00 руб.", "sale":false,"saleprice":"","new":false,"top":false,"view":"productsImages/heavenly_morning.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Maрмелад\"", "code":9, "count":3,"expected":0, "price":"150.00 руб.", "sale":false,"saleprice":"","new":false,"top":false,"view":"productsImages/marmalade.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Краски мaрта\"", "code":10, "count":1, "expected":1, "price":"230.00 руб.","sale":false,"saleprice":"","new":false,"top":false, "view":"productsImages/colors_of_march.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"},
{"category":"букеты из тюльпанов","name":"Букет \"Весенний микс\"", "code":11, "count":3, "expected":4, "price":"115.00 руб.", "sale":false,"saleprice":"","new":false,"top":true,"view":"productsImages/spring_mix.jpg","description":"Букет состоит из 15 белых тюльпанов, обернутых в крафтовую бумагу"}]   ;
         

test('работа кнопки "Категории товаров"', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <BrowserRouter><Categories listProd={listProd}/></BrowserRouter>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку "Категории товаров"
  const buttonElem = component.root.find( el => el.props.className=='sidebarName'); 
  console.log(buttonElem);
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  });

  