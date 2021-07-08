import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './CartCounter.css';

class CartCounter extends React.PureComponent{

    static propTypes ={ 
      shopCart:PropTypes.object.isRequired, // передано из Redux
    };

    render() {
      return (
      <div className='CartCounter'>
         {this.props.shopCart.products.length}
      </div>
      );
    }
  }


  const mapStateToProps = function (state) {
    return {   
      shopCart: state.shopCart,      
    };
  };
  
  export default connect(mapStateToProps)(CartCounter);