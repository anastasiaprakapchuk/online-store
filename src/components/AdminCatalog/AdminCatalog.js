import React from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminCatalog.css';
import AdminOneProduct from '../AdminOneProduct/AdminOneProduct';
import AdminProductCard from '../AdminProductCard/AdminProductCard';
import AdminNewCard from '../AdminNewCard/AdminNewCard';

import {deleteProductFromListProd, saveProductFromListProd} from '../../redux/listProdAC';
import {saveDataForServer} from '../../redux/saveDataForServer';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AdminCatalog extends React.PureComponent{

    static propTypes = {
      productList: PropTypes.object.isRequired,//получено из Redux
    };

    state = {       
      cardProductAppear:null,
      newCardProduct:false, 
      currentSelectCategory:'Все категории',
      currentSelect:'По умолчанию',   
    };

    componentDidMount = ()=>{
      clickEvents.addListener('EVProductClickDelete',this.productDelete);
      clickEvents.addListener('EVProductClickEdit',this.productEdit);
      clickEvents.addListener('EVclickButtonCancel',this.clickButtonCancel);
      clickEvents.addListener('EVclickButtonSave',this.clickButtonSave);
    }

    componentWillUnmount = ()=>{
      clickEvents.removeListener('EVProductClickDelete',this.productDelete);
      clickEvents.removeListener('EVProductClickEdit',this.productEdit);
      clickEvents.removeListener('EVclickButtonCancel',this.clickButtonCancel);
      clickEvents.removeListener('EVclickButtonSave',this.clickButtonSave);
    }

    productDelete = (id)=> {
        console.log('удалена строка '+id);
        this.props.dispatch( deleteProductFromListProd(id) ); 
        this.saveDeleteForServer(id);
    }

    productEdit = (id)=> {
      let cardProductAppear=this.props.productList.data.find(v => v.code===id);
      this.setState({cardProductAppear:cardProductAppear});
      document.body.style.overflow = "hidden";
    }

    clickButtonCancel = ()=>{
      this.setState({cardProductAppear:null, newCardProduct:false});
      document.body.style.overflow = "";
    }

    clickButtonSave = (newProduct)=>{
      console.log(this.props.state);
      this.setState({cardProductAppear:null, newCardProduct:false});
      document.body.style.overflow = "";
      this.props.dispatch( saveProductFromListProd(newProduct) );
      this.saveEditForServer(newProduct);
    }

    saveEditForServer = (newProduct)=>{
      var newProductList=[...this.props.productList.data];
      var index=this.props.productList.data.findIndex(v => v.code===newProduct.code);
      
      index!==-1
      ?newProductList.splice(index,1,newProduct)
      :newProductList.push(newProduct); 
     
      var newState={...this.props.state,productList:{...this.props.state.productList,data:newProductList} };
      saveDataForServer(newState);
    }

    saveDeleteForServer = (id)=>{
      var newProductList=[...this.props.productList.data];
      var index=this.props.productList.data.findIndex(v => v.code===id);
      newProductList.splice(index,1); 
      var newState={...this.props.state,productList:{...this.props.state.productList,data:newProductList} };
      saveDataForServer(newState);
    }

    addNewProduct = () =>{
      this.setState({newCardProduct:true});
      document.body.style.overflow = "hidden";
    }

    changeSelectCategory = (EO) =>{
      this.setState({currentSelectCategory:EO.target.value});
    }

    changeSelect = (EO) =>{
      this.setState({currentSelect:EO.target.value});
    }

    render() {
      var headCode=(
      <tr className='HeadOrders'>
        <td className='Id'>{'Код'}</td>
        <td className='View'>{'Изображение'}</td>
        <td className='Name'>{'Наименование'}</td>
        <td className='Price'>{'Цена, руб.'}</td>
        <td className='SalePrice'>{'Цена по акции, руб.'}</td>
        <td className='Count'>{'В наличии'}</td>
        <td className='Expected'>{'Заказано'}</td>
        <td className='Extra'>{'Дополнительно'}</td>
      </tr>
      );

      let productListCode;

      let newProductList=(this.state.currentSelectCategory==='Все категории'?
      this.props.productList.data:
      this.props.productList.data.filter(v=>v.category===this.state.currentSelectCategory));

      if(this.state.currentSelect==='По умолчанию'){
        newProductList.sort( (a,b) => a.code-b.code);
     }
     if(this.state.currentSelect==='По популярности'){
        //доделать!!!!
     }
     if(this.state.currentSelect==='По скидкам'){
        newProductList.sort( (a,b) =>{
          let salepriceA=(a.saleprice===''?a.price:a.saleprice);
          let salepriceB=(b.saleprice===''?b.price:b.saleprice);
          return (parseFloat(b.price)-parseFloat(salepriceB))-(parseFloat(a.price)-parseFloat(salepriceA));} );
     }
     if(this.state.currentSelect==='По возрастанию цены'){
        newProductList.sort( (a,b) => parseFloat(a.price)-parseFloat(b.price));
     }
     if(this.state.currentSelect==='По убыванию цены'){
        newProductList.sort( (a,b) => parseFloat(b.price)-parseFloat(a.price));
     }
     if(this.state.currentSelect==='По наличию'){
      newProductList.sort( (a,b) => parseFloat(b.count)-parseFloat(a.count));
     }
     if(this.state.currentSelect==='По новинкам'){
      newProductList.sort( (a,b) => {
        if(String(a.new)<String(b.new))
           return 1;
        if(String(a.new)>String(b.new))
           return -1;
        return 0;  } );
     }

      productListCode=newProductList.map(v=>
        <AdminOneProduct key={v.code} info={v}/>
      );

      var categoriesAll={};

      this.props.productList.data.forEach(el => {
        if(!(el.category in categoriesAll))
          categoriesAll[el.category]=true;        
      });

      var categories=Object.keys(categoriesAll);

      var options=categories.map(v =>
      <option key={v} value={v}>{v}</option>
      );
      
      return ( 
      
      <div className='OrdersList'> 
        <h2 className='NameOrdersList'>Каталог товаров</h2>
        <div className='flexContainer'>

        <button className='AddNewProduct' onClick={this.addNewProduct}>
          <FontAwesomeIcon icon={faPlus}/>
          <span> Добавить товар</span>
        </button>

        <div className=''>
            <select onChange={this.changeSelectCategory} defaultValue={this.state.currentSelectCategory}>
              <option defaultValue="Все категории" >Все категории</option>
              {options}
            </select>
         </div>

        <div className=''>
            <select onChange={this.changeSelect} defaultValue={this.state.currentSelect}>
              <option defaultValue="По умолчанию" >По умолчанию</option>
              <option defaultValue="По популярности" >По популярности</option>
              <option defaultValue="По скидкам" >По скидкам</option>
              <option defaultValue="По возрастанию цены" >По возрастанию цены</option>
              <option defaultValue="По убыванию цены" >По убыванию цены</option>
              <option defaultValue="По наличию" >По наличию</option>
              <option defaultValue="По новинкам" >По новинкам</option>
            </select>
        </div> 

        <table className='TopOrderList'>
          <tbody>
             {headCode}
             {productListCode}
              
          </tbody>
        </table>
        {this.state.cardProductAppear?<div className={this.state.cardProductAppear?'CardProductAppear':''}>
          <AdminProductCard info={this.state.cardProductAppear} productList={this.props.productList.data}/></div>:null}

        {this.state.newCardProduct?<div className={this.state.newCardProduct?'CardProductAppear':''}>
          <AdminNewCard code={this.props.productList.data[this.props.productList.data.length-1].code+1} productList={this.props.productList.data}/></div>:null}  
        </div>
      </div>
      
      );      
    }
  
  }



  
const mapStateToProps = function (state) {
  return {
    state:state,
    productList: state.productList,
  };
};

export default connect(mapStateToProps)(AdminCatalog);