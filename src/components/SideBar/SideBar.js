import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterByPrice from '../FilterByPrice/FilterByPrice';
import Categories from '../Categories/Categories';

import './SideBar.css';
import './SideBar_media.css';

class SideBar extends React.PureComponent{
    
    static propTypes = {
      
      listProd:PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          code: PropTypes.number.isRequired,
          count: PropTypes.number.isRequired,
          expected: PropTypes.number,
          price: PropTypes.string.isRequired,          
          view: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired, 
        }) //получено от родителя
      ),
    };



    render() {
     console.log('renderSideBar');
     let sortList=this.props.listProd;
     //сортируем по убыванию цены:
     sortList.sort( (a,b) => parseFloat(a.price)-parseFloat(b.price));
     //последний элемент в списке:
     let lastElemSortListPrice=parseFloat(sortList[sortList.length-1].price);
     
      return ( 
        <Fragment>
        <div className='sidebar'>       
        
          <Categories listProd={this.props.listProd}/> 
          <FilterByPrice listProd={this.props.listProd} filterPriceMax={lastElemSortListPrice}/>  
        </div> 
        </Fragment>    
      );      
    }
  
  }

  export default SideBar;

  