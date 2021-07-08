import React from 'react';

import PropTypes from 'prop-types';
import { listProdThunkAC } from "./redux/fetchThunk";
import {connect} from 'react-redux';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PagesRouter from './pages/PagesRouter';


class App extends React.Component {
  static propTypes = {
    productList: PropTypes.object.isRequired,//получено из Redux
    imagesInfo: PropTypes.object.isRequired,//получено из Redux
    contactsInfo:PropTypes.object.isRequired,//получено из Redux
    orders:PropTypes.object.isRequired,//получено из Redux
  };

  componentDidMount() {
    if ( (this.props.productList.status!==3)||(this.props.imagesInfo.status!==3)||(this.props.contactsInfo.status!==3)||(this.props.orders.status!==3))
    this.props.dispatch( listProdThunkAC(this.props.dispatch) );    
  }

render(){
    if ( this.props.imagesInfo.status<=1 )
      return "загрузка...";

    if ( this.props.imagesInfo.status===2 )
      return "ошибка загрузки данных";  
  
    if ( this.props.productList.status<=1 )
      return "загрузка...";

    if ( this.props.productList.status===2 )
      return "ошибка загрузки данных";

    if ( this.props.orders.status<=1 )
      return "загрузка..."; 
    
    if ( this.props.orders.status===2 )
      return "ошибка загрузки данных";  

    if ( this.props.contactsInfo.status<=1 )
      return "загрузка...";

    if ( this.props.contactsInfo.status===2 )
      return "ошибка загрузки данных productList";
    
  return (
   
      <div className="App">
        <div className='content'>
        {(window.location.href.indexOf('admin')==-1)&&<Header/>}
        <PagesRouter />
        </div>
        {(window.location.href.indexOf('admin')==-1)&&<Footer contactsInfo={this.props.contactsInfo}/>}
      </div>
   
  );
}  
}

const mapStateToProps = function (state) {
  return {
    productList: state.productList,
    imagesInfo: state.imagesInfo,
    contactsInfo:state.contactsInfo,
    orders:state.orders,
  };
};

export default connect(mapStateToProps)(App);
