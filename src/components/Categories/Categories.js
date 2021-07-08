import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './Categories.css';
import './Categories_media.css';

class Categories extends React.PureComponent{
    
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

    state = {
       appearCategories:'',
    };

    clickSidebarName =()=>{
      if(this.state.appearCategories===''){
        this.setState({
          appearCategories:'appearCategories',
        })
      }else{
        this.setState({
          appearCategories:'',
        })
      }
       
    }


    render() {
     
      var categoriesAll={};

      this.props.listProd.forEach(el => {
        if(!(el.category in categoriesAll))
          categoriesAll[el.category]=true;        
      });

      var categories=Object.keys(categoriesAll);

      var sidebarCategories=categories.map(v =>
      <p key={v} ><NavLink  exact to={'/catalog/'+v} className='sidebarCategory' onClick={()=>window.scrollTo(0,0)}>{v}</NavLink></p>
      );

      return ( 
        
        <div >
            <p className='sidebarName' onClick={this.clickSidebarName}><FontAwesomeIcon className='sidebarNameIcon' icon={faBars} size='2x' /><span>Категории товаров</span></p>
            <div className={'sidebarCategories '+this.state.appearCategories}>{sidebarCategories}</div>            
        </div>       
      );      
    }
  
  }

  export default Categories;

  