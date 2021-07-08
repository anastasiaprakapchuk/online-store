import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ListProd from '../components/ListProd/ListProd';
import SideBar from '../components/SideBar/SideBar';
import Options from '../components/Options/Options';
import Page_Catalog_Category from './Page_Catalog_Category';

import {connect} from 'react-redux';

class Page_Catalog extends React.PureComponent {
  static propTypes = {
    productList: PropTypes.object.isRequired,//получено из Redux
  };

  render() {
    console.log(this.props.productList);
    return (
      <div className='Container'>
        <SideBar listProd={this.props.productList.data}/>
        <Options/>
      <div>         
        <Route path="/catalog" exact render={() =><ListProd listProd={this.props.productList.data}/>} />
        <Route path="/catalog/:clid" render={props => <Page_Catalog_Category {...props} listProd={this.props.productList.data}/>} />
      </div>
      </div>
        
    );
    
  }

}
    

const mapStateToProps = function (state) {
  return {
    productList: state.productList,
  };
};

export default connect(mapStateToProps)(Page_Catalog);