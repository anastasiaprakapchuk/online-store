import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { options_change_currentselect, options_change_workmode } from '../../redux/optionsAC';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import './Options.css';
import './Options_media.css';

class Options extends React.PureComponent{
  
  static propTypes = {
    options:PropTypes.object.isRequired, // передано из Redux
  };

  viewLargeIcons='viewLargeIcons';
  viewList='viewList';
  
  changeSelect = (EO) =>{ 
    this.props.dispatch( options_change_currentselect(EO.target.value) );   
  }
   
  clickViewList = () =>{
    this.props.dispatch( options_change_workmode(this.viewList) );  
  }

  clickViewLargeIcons = () =>{
    this.props.dispatch( options_change_workmode(this.viewLargeIcons) );  
  }

  render() {
   console.log('renderOptions');
   let workMode=this.props.options.workMode;
   let currentSelect=this.props.options.currentSelect;

    return (     
      <div className='options'>
         <div className='viewListProd'>
            <span className={workMode===this.viewLargeIcons?'activeIcon':'noActive'} 
            onClick={this.clickViewLargeIcons}><FontAwesomeIcon className='icons' icon={faTh} size='2x'/></span>
            <span className={workMode===this.viewList?'activeIcon':'noActive'} 
            onClick={this.clickViewList}><FontAwesomeIcon className='icons' icon={faThList} size='2x'/></span>
         </div>

         <div className='filtersProd'>
            <select onChange={this.changeSelect} defaultValue={currentSelect}>
              <option defaultValue="По умолчанию" >По умолчанию</option>
              <option defaultValue="По имени от А до Я" >По популярности</option>
              <option defaultValue="По имени от Я до А" >По скидкам</option>
              <option defaultValue="По возрастанию цены" >По возрастанию цены</option>
              <option defaultValue="По убыванию цены" >По убыванию цены</option>
            </select>
         </div>
      </div>

    );      
  }

}
const mapStateToProps = function (state) {
  return {   
    options: state.options,    
  };
};

export default connect(mapStateToProps)(Options);

  