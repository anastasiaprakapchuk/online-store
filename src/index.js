
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import combinedReducer from './redux/reducers.js';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import addStringDataForServer from './addStringDataForServer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(combinedReducer, composeEnhancers(applyMiddleware(thunk)));

addStringDataForServer();//загружаем первоначальные данные на сервер, в случае, если их там нет

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Beforeunload onBeforeunload={( ) => " Вы потеряете свои данные! "}>
     <Provider store={store}>
      <App />
     </Provider> 
    </Beforeunload> 
    </BrowserRouter>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

