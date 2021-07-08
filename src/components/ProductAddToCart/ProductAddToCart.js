import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import './Product.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";

class ProductAddToCart extends React.Component{

    static propTypes ={ 
      info:PropTypes.shape({
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        expected: PropTypes.number,
        price: PropTypes.string.isRequired,          
        view: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired, 
      }),
      workMode:PropTypes.string,
    };

    state = {
      hoverImg:"",
      hoverOption:"",
      clickShoppingBag:false,
      clickHeart:false,
    };

    imgProd=null;
    optionProd=null;

    setImgRef = (ref) => {
        this.imgProd=ref;
    }

    setOptionRef = (ref) => {
        this.optionProd=ref;
    }

    changeView = () =>{
        if (this.imgProd&&this.optionProd){
          this.setState({
            hoverImg:" ViewProdScale",
            hoverOption:" OptionsProdAppear",
          });
        }
    }

    changeViewBack = () => {
      if (this.imgProd&&this.optionProd){
        this.setState({
          hoverImg:"",
          hoverOption:"",
        });
      }
    }

    clickShoppingBag = (EO) => {
      EO.stopPropagation();
      this.setState({
        clickShoppingBag:true,
        //cделать voteEvents.emit('EAnswerClicked',this.props.code)
      });
    }

    clickHeart = (EO) => {
      EO.stopPropagation();
      this.setState({
        clickHeart:true,
        //cделать voteEvents.emit('EAnswerClicked',this.props.code)
      });
    }

    clickProduct = () => {
       this.props.history.push("/productCard/"+this.props.info.code);
    }

    clickReply = (EO) => {
       EO.stopPropagation();
       this.props.history.push("/favorites");
    }
    // productClicked = (EO)=> {
    //   this.props.cbSelected(this.props.code);
    // }

    // productClickedButton = (EO)=> {
    //   EO.stopPropagation();
    //   var deleteProduct = confirm("Вы уверены, что хотите удалить товар?");
    //   deleteProduct?this.props.cbSelectedButton(this.props.code):null;
    // }

    // productClickedButtonEdit = (EO)=> {
    //   EO.stopPropagation();
    //   this.props.cbSelectedButtonEdit(this.props.code);
    // }

    render() {
      let productDefault=(
      <div className='Product' onMouseEnter={this.changeView} onMouseLeave={this.changeViewBack} onClick={this.clickProduct}>
        <div className="Fon">
          <img className={'ViewProd'+this.state.hoverImg} src={this.props.info.view} ref={this.setImgRef}/>
          <div className={'OptionsProd'+this.state.hoverOption} ref={this.setOptionRef}>
             <div><FontAwesomeIcon className='icons' title='Добавить товар в избранные' icon={this.state.clickHeart?faReply:faHeart} onClick={this.state.clickHeart?this.clickReply:this.clickHeart}/></div>
             <div><FontAwesomeIcon className='icons' title='Добавить товар в корзину' icon={this.state.clickShoppingBag?faCheck:faShoppingBag} onClick={this.clickShoppingBag}/></div>
          </div> 
        </div>
                    
        <p className='NameProd'>{this.props.info.name}</p>
        <p className='PriceProd'>{this.props.info.price}</p>
            
      </div> 
      );

      let productForViewLargeIcons=productDefault;

      let productForViewList=(
        <div className='ProductList' onMouseEnter={this.changeView} onMouseLeave={this.changeViewBack} onClick={this.clickProduct}>
          <div className="FonList">         
              <img className={'ViewProdList'+this.state.hoverImg} src={this.props.info.view} ref={this.setImgRef}/>                                      
          </div>

          <div className='descriptionList'>
               <p className='NameProdList'>{this.props.info.name}</p>
               <p className='PriceProdList'>{this.props.info.price}</p>
               <p className='DescriptionProdList'>{this.props.info.description}</p>
          </div>
         
          <div className='OptionsProdList' ref={this.setOptionRef}>
                <div><FontAwesomeIcon className='icons' size='2x' title='Добавить товар в избранные' icon={this.state.clickHeart?faReply:faHeart} onClick={this.state.clickHeart?this.clickReply:this.clickHeart}/></div>
                <div><FontAwesomeIcon className='icons' size='2x' title='Добавить товар в корзину' icon={this.state.clickShoppingBag?faCheck:faShoppingBag} onClick={this.clickShoppingBag}/></div>
          </div>
                                                                      
        </div> 
        );

      if(this.props.workMode==='viewLargeIcons'){   
         return productForViewLargeIcons;
      } if(this.props.workMode==='viewList'){   
         return productForViewList;
      } else{
         return productDefault;  
      }
    }
  
  }
  export default withRouter(Product);