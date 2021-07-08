"use strict";

import React from 'react';
import { SectionInfo } from '../components/SectionInfo/SectionInfo';
import renderer from 'react-test-renderer';


let imagesInfo={data:["imagesInfo/wish.jpg","imagesInfo/sale.jpg","imagesInfo/sale8m.jpg"] };
         

test('работа стрелки "Вправа"', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <SectionInfo imagesInfo={imagesInfo}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму стрелку "Вправа"
  const buttonElem = component.root.find( el => el.props.className=="arrow arrowRight"); 
  console.log(buttonElem);
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  });

  