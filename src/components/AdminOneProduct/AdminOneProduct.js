import React from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminOneProduct.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

class AdminOneProduct extends React.PureComponent{

    static propTypes = {
      info:PropTypes.object.isRequired,//получено от родителя
    };

    state = {
      appearSalePriceInput:false,
      valueSalePrice:'',
      sale:this.props.info.saleprice,
      ERRValueSalePrice:'Укажите акционную цену!',
    };

    deleteProduct = (EO) => {
      clickEvents.emit('EVProductClickDelete', this.props.info.code);
    }

    editProduct = (EO) => {
      clickEvents.emit('EVProductClickEdit', this.props.info.code);
    }

    clickedButtonSale = (EO) =>{
      let sale=(this.props.info.sale===true||this.props.info.sale==='true')?'false':'true';
      sale==='true'&&
      this.setState({appearSalePriceInput:true, sale:true,ERRValueSalePrice:'Укажите акционную цену!' });
      
      sale==='false'&&
      this.setState({sale:false, valueSalePrice:''},this.cancelValueSalePrice);
    }

    setValueSalePrice = () =>{
      let saleprice=parseFloat(this.state.valueSalePrice.replace(/,/,'.')).toFixed(2)+' руб.';
      console.log(saleprice);
      let newProduct={...this.props.info, sale:this.state.sale, saleprice:saleprice};
      clickEvents.emit('EVclickButtonSave',newProduct);
      this.setState({appearSalePriceInput:false});
    }

    cancelValueSalePrice = () =>{
      let newProduct={...this.props.info, sale:false, saleprice:''};
      clickEvents.emit('EVclickButtonSave',newProduct);
      this.setState({appearSalePriceInput:false});
    }

    changeValueSalePrice = (EO) =>{
      this.setState({valueSalePrice:EO.target.value},this.validateSalePrice);//добавить проверку
    }

    validateSalePrice = () =>{
      console.log((this.state.valueSalePrice));
      (/^ *\d+[\.,]?\d{0,2} *$/.test(this.state.valueSalePrice))?  
      this.setState( {ERRValueSalePrice:null})
      :this.setState( {ERRValueSalePrice:'Укажите акционную цену!'});
    }

    clickedButtonNew = (EO) =>{
      let newProd=(this.props.info.new===true||this.props.info.new==='true')?'false':'true';
      let newProduct={...this.props.info, new:newProd};
      clickEvents.emit('EVclickButtonSave',newProduct);
    }

    render() { 
     console.log('Product render '+this.props.info.code+' -'+this.props.info.sale);
      return (
      <tr className='ProductOne'>
        <td className='Id'>{this.props.info.code}</td>
        <td className='View'> <img src={this.props.info.view}></img> </td>
        <td className='Name'>{this.props.info.name}</td>
        <td className='Price'>{this.props.info.price.replace(/руб./,'')}</td>
        <td className='SalePrice'>
          {
          this.state.appearSalePriceInput?
           <div className={this.state.appearSalePriceInput?'AppearSalePriceInput':'HideSalePriceInput'}>
              <span className='ErrAdminOneProduct'>{this.state.ERRValueSalePrice}</span>
              <input type='text' name='saleprice' value={this.state.valueSalePrice} onChange={this.changeValueSalePrice}/>
              <br/>
              <button disabled={this.state.ERRValueSalePrice?true:false} onClick={this.setValueSalePrice}>Сохранить</button>
              <br/>
              <button onClick={this.cancelValueSalePrice}>Отмена</button>
           </div>
          :(this.props.info.saleprice===''?'-':this.props.info.saleprice.replace(/руб\./,''))
          }
        </td>
        <td className='Count'>{this.props.info.count}</td>
        <td className='Expected'>{this.props.info.expected}</td>
        <td className='Extra'>
          <div className='ExtraContainer'>
          <button className={(this.props.info.new===true||this.props.info.new==='true')?'ExtraIconOn':'ExtraIcon'}
          onClick={this.clickedButtonNew}>new</button>
          <button className={(this.props.info.sale===true||this.props.info.sale==='true')?'ExtraIconOn':'ExtraIcon'}
          onClick={this.clickedButtonSale}><FontAwesomeIcon icon={faPercent}/></button>
          <button className='ExtraIcon' disabled><FontAwesomeIcon icon={faStar}/></button>
          <button className='ExtraIcon' onClick={this.editProduct}><FontAwesomeIcon icon={faPen}/></button>
          <button className='ExtraIcon' onClick={this.deleteProduct}><FontAwesomeIcon icon={faTrashAlt}/></button>
          </div>
          
        </td>
          
      </tr> 
                     
    );
    
    }
  
  }
  export default AdminOneProduct;