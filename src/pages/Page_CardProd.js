import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import CardProd from '../components/CardProd/CardProd';
import SectionReference from '../components/SectionReference/SectionReference';


class Page_CardProd extends React.PureComponent {
  static propTypes = {
    productList: PropTypes.object.isRequired,//получено из Redux
  };
          
  render() {
    
    let productNew=this.props.productList.data.filter(v => v.new===true);
    let productTop=this.props.productList.data.filter(v => v.top===true);

    let productCode=parseInt(this.props.match.params.clid);

    let productData=this.props.productList.data.find( c => c.code==productCode );
    //productNew.forEach(v => {v.view='../../'+v.view});//
    //productTop.forEach(v => {v.view='../../'+v.view});//
    return (
      <div>
        <CardProd info={productData}/>
        <SectionReference productNew={productNew} productTop={productTop}/>
      </div>
    );
    
  }

}

const mapStateToProps = function (state) {
  return {
    productList: state.productList,
  };
};    
export default connect(mapStateToProps)(Page_CardProd);
    