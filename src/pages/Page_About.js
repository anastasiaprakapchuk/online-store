import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import SectionInfoSlider from '../components/SectionInfoSlider/SectionInfoSlider';
import SectionSale from '../components/SectionSale/SectionSale';
import SectionReference from '../components/SectionReference/SectionReference';

class Page_About extends React.PureComponent {
  static propTypes = {
    productList: PropTypes.object.isRequired,//получено из Redux
    imagesInfo: PropTypes.object.isRequired,//получено из Redux
  };
    
  render() {
   let productSale=this.props.productList.data.filter(v => v.sale===true);
   let productNew=this.props.productList.data.filter(v => v.new===true);
   let productTop=this.props.productList.data.filter(v => v.top===true);
   
    return (
      <Fragment>
          <SectionInfoSlider imagesInfo={this.props.imagesInfo}/>
          <SectionSale productSale={productSale}/>
          <SectionReference productNew={productNew} productTop={productTop}/>
      </Fragment>
        
    );
    
  }

}

    

const mapStateToProps = function (state) {
  return {
    productList: state.productList,
    imagesInfo: state.imagesInfo,
  };
};
    
export default connect(mapStateToProps)(Page_About);
    