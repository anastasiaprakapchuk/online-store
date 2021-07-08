import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import './AdminNewCard.css';

class AdminNewCard extends React.PureComponent{

    static propTypes = {
      code:PropTypes.number.isRequired,//получено от родителя
      productList:PropTypes.array.isRequired,//получено от родителя
    };

    state = {
     
    //sale(pin):true
    //new(pin):false
    //top(pin):false
     
      valueCategory: '',
      valueName: '',
      valueURL: '',
      valuePrice: '',
      valueSale: false,
      valueNew: true,
      valueTop: false,
      valueSalePrice: '',
      valueCount: 0,
      valueExpected: 0,
      valueDescription: '',

      validCategoryErr: null,
      validNameErr: null,
      validURLErr: null,
      validPriceErr: null,
      validSalePriceErr: null,
      validCountErr: null,
      validExpectedErr: null,
      validDescriptionErr: null,

      validForm:false,
    };

    
    changedText = (EO) =>{
   
      EO.stopPropagation();
      switch(EO.target.name){
        case 'category':
          this.setState( {valueCategory:EO.target.value} );
          break;
        case 'name':
          this.setState( {valueName:EO.target.value},this.validFormName );
          break;
        case 'url':
          this.setState( {valueURL:EO.target.value},this.validFormURL );
          break;
        case 'price':
          this.setState( {valuePrice:EO.target.value},this.validFormPrice );
          break;
        case 'stock':
          EO.target.value==='true'&&
          this.setState( {valueSale:EO.target.value});
          EO.target.value==='false'&&
          this.setState( {valueSale:EO.target.value, valueSalePrice:''});
          break;
        case 'new':
          this.setState( {valueNew:EO.target.value});
          break;     
        case 'saleprice':
          this.setState( {valueSalePrice:EO.target.value},this.validFormSalePrice );
          break;
        case 'count':
          this.setState( {valueCount:EO.target.value},this.validFormCount );
          break;
        case 'expected':
          this.setState( {valueExpected:EO.target.value},this.validFormExpected );
          break;
        case 'description':
          this.setState( {valueDescription:EO.target.value},this.validFormDescription );
          break;                     
      }
    }

    validFormName = () =>{
      (this.state.valueName==='')
      ?this.setState( {validNameErr:'Укажите название товара!'} ):this.setState( {validNameErr:null} );
    }

    validFormURL = () =>{
      (this.state.valueURL==='')
      ?this.setState( {validURLErr:'Укажите URL изображения товара'} ):this.setState( {validURLErr:null} );
    }

    validFormPrice = () =>{
      (this.state.valuePrice==='')
      ?this.setState( {validPriceErr:'Укажите цену товара!'} ):this.setState( {validPriceErr:null} );
    }

    validFormSalePrice = () =>{
      (this.state.valueSalePrice==='')
      ?this.setState( {validSalePriceErr:'Укажите акционную цену товара!'} ):this.setState( {validSalePriceErr:null} );
    }

    validFormCount = () =>{
      (this.state.valueCount==='')
      ?this.setState( {validCountErr:'Укажите количества товара на складе!'} ):(isNaN(this.state.valueCount)
      ?this.setState( {validCountErr:'Количество должно быть числом!'} ):this.setState( {validCountErr:null} ) );
    }

    validFormExpected = () =>{
      (this.state.valueExpected==='')
      ?this.setState( {validExpectedErr:'Укажите количество заказанных единиц товара!'} ):(isNaN(this.state.valueExpected)
      ?this.setState( {validExpectedErr:'Количество должно быть числом!'} ):this.setState( {validExpectedErr:null} ));
    }

    validFormDescription = () =>{
      (this.state.valueDescription==='')
      ?this.setState( {validDescriptionErr:'Опишите товар'} ):this.setState( {validDescriptionErr:null} );
    }

    validForm = (EO) =>{
      ((this.state.valueName==='')||
      (this.state.valueURL==='')||
      (this.state.valuePrice==='')||
      (this.state.valueSalePrice===''&&this.state.valueSale==='true')||
      (this.state.valueCount==='')||
      (this.state.valueDescription==='')||
      (this.state.valueExpected===''))
      ?this.setState( {validForm:false},this.appearAllErrors ):this.setState( {validForm:true},this.clickedButtonSave );
    }

    appearAllErrors = () =>{
      this.validFormName();
  
      this.validFormURL();
  
      this.validFormPrice();
  
      this.validFormSalePrice();
  
      this.validFormCount();
  
      this.validFormExpected();
  
      this.validFormDescription();
    }

    readFile = (EO) =>{
      let file = EO.target.files[0];
      //let reader = new FileReader();
      //var newCurrentImg='';
      //reader.readAsDataURL(file);

      //reader.onload = () =>{
         //newCurrentImg=reader.result;
         console.log(file.name);
         this.setState({valueURL:'productsImages/'+file.name});
      //};

      //reader.onerror = () =>{
      //   console.log(reader.error);
      //};
    }

    clickedButtonCancel = (EO) =>{
      clickEvents.emit('EVclickButtonCancel');
    }

    clickedButtonSave = () =>{

      let newProduct={category:this.state.valueCategory,
                      name:this.state.valueName,
                      code:this.props.code,
                      count:Number(this.state.valueCount),
                      expected:Number(this.state.valueExpected),
                      price:this.state.valuePrice,
                      sale:this.state.valueSale,
                      saleprice:this.state.valueSalePrice,
                      new:this.state.valueNew,
                      top:this.state.valueTop,
                      view:this.state.valueURL,
                      description:this.state.valueDescription};
      clickEvents.emit('EVclickButtonSave',newProduct);
    }

    render() {     
      var categoriesAll={};

      this.props.productList.forEach(el => {
        if(!(el.category in categoriesAll))
          categoriesAll[el.category]=true;        
      });

      var categories=Object.keys(categoriesAll);

      var options=categories.map(v =>
      <option key={v} value={v}>{v}</option>
      );

      return (        
          <div className='AdminCardProd'>
          <span className='AdminCardName'>{'Добавление нового товара'}</span><br/>
          
          <div className='AdminCardFlex'>
            <div className='AdminCardFlexImg'>
               <img className='AdminViewImgCard' 
               src={this.state.valueURL!==''?this.state.valueURL:'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png'}/><br/>
            </div>
          <table>
          <tbody>

          <tr> 
          <td><span>{'Код: '}</span></td>             
          <td>
            <input type='text' name='code' defaultValue={this.props.code} readOnly/>        
          </td>
          </tr>

          <tr>  
          <td><span>{'Категория: '}</span></td>    
          <td>
            <select name='category' onChange={this.changedText}>
             {options} 
            </select>            
          </td> 
          </tr>

          <tr>  
          <td><span>{'Наименование: '}</span></td>    
          <td> 
            <span className='Err'>{this.state.validNameErr}</span>          
            <input type='text' name='name' value={this.state.valueName} onChange={this.changedText}/>        
          </td> 
          </tr> 
          
          <tr> 
          <td><span>{'Описание: '}</span></td>             
          <td>
            <span className='Err'>{this.state.validDescriptionErr}</span>
            <textarea name='description' value={this.state.valueDescription} rows='6' onChange={this.changedText}/>                    
          </td>
          </tr>

          <tr>
          <td><span>{'URL изображения: '}</span></td> 
          <td>
            <span className='Err'>{this.state.validURLErr}</span>
            <input type='file' name='url' onChange={this.readFile}/>                     
          </td>
          </tr>

          <tr>
          <td><span>{'Цена: '}</span> </td>           
          <td>
            <span className='Err'>{this.state.validPriceErr}</span>
            <input type='text' name='price' value={this.state.valuePrice.replace(/руб./,'')} onChange={this.changedText}/>                  
          </td>
          </tr>
          
          <tr>
          <td><span>{'Товар акционный?'}</span> </td>           
          <td>
           <div>
            <input type='radio' name='stock' value="true" id='stockTrue' onChange={this.changedText} defaultChecked={this.state.valueSalePrice!==''?true:false}/><label htmlFor="stockTrue">Да</label>
            <input type='radio' name='stock' value="false" id='stockFalse' onChange={this.changedText} defaultChecked={this.state.valueSalePrice!==''?false:true}/><label htmlFor="stockFalse">Нет</label>
           </div>
          </td>
          </tr>

          <tr className={(this.state.valueSale==='true'||this.state.valueSale===true)?'appearSaleprice':'hideSaleprice'}>
          <td><span>{'Цена по акции: '}</span> </td>           
          <td>
            <span className='Err'>{this.state.validSalePriceErr}</span>
            <input type='text' name='saleprice' value={this.state.valueSalePrice.replace(/руб./,'')} onChange={this.changedText}/>               
          </td>
          </tr>

          <tr>
          <td><span>{'Новинка: '}</span> </td>           
          <td>
          <div>
            <input type='radio' name='new' value="true" id='newTrue' onChange={this.changedText} defaultChecked={(this.state.valueNew==='true'||this.state.valueNew===true)?true:false}/><label htmlFor="newTrue">Да</label>
            <input type='radio' name='new' value="false" id='newFalse' onChange={this.changedText} defaultChecked={(this.state.valueNew==='true'||this.state.valueNew===true)?false:true}/><label htmlFor="newFalse">Нет</label>
           </div>
            {/* <input type='text' name='new' value={this.state.valueNew} onChange={this.changedText}/>       */}
          </td>
          </tr>

          {/* <tr>
          <td><span>{'Популярный товар: '}</span> </td>           
          <td>
            <input type='text' name='top' value={this.state.valueTop} onChange={this.changedText}/>      
          </td>
          </tr> */}

          <tr>
          <td><span>{'В наличии: '}</span></td>       
          <td>
            <span className='Err'>{this.state.validCountErr}</span>
            <input type='number' name='count' min='0' value={this.state.valueCount} onChange={this.changedText}/>                  
          </td>
          </tr>

          <tr>
          <td><span>{'Ожидается привоз: '}</span></td>
          <td>
            <span className='Err'>{this.state.validExpectedErr}</span>
            <input type='number' name='expected' min='0' value={this.state.valueExpected} onChange={this.changedText}/>            
          </td>
          </tr>

          </tbody>
          </table>
          </div>
          <div className='InputButtons'>
              <input className='InputButtonSave' type='button' value='сохранить' 
                    //  disabled={(this.state.validForm)?false:true} 
                     onClick={this.validForm}/>
              <input className='InputButtonCancel' type='button' value='отмена' 
                     onClick={this.clickedButtonCancel}/>
          </div>      
        </div>          
      );
    
    }
  
  }
  export default AdminNewCard;