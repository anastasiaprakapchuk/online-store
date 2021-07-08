import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './FavoritesCounter.css';

class FavoritesCounter extends React.PureComponent{

    // static propTypes ={ 
    //   shopCart:PropTypes.object.isRequired, // передано из Redux
    // };

    render() {
      return (
      <div className='FavoritesCounter'>
         {/* {this.props.shopCart.length} */}
         0
      </div>
      );
    }
  }


  // const mapStateToProps = function (state) {
  //   return {   
  //     shopCart: state.shopCart,      
  //   };
  // };
  
  export default (FavoritesCounter);