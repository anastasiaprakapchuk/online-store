import React from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {saveStringDataForServer} from '../saveStringDataForServer';
import './FormOrder.css';
import './FormOrder_media.css';
import delivery from './delivery.jpg';
import pickup from './pickup.jpg';

class FormOrder extends React.PureComponent{

  static propTypes = {
    price:PropTypes.number.isRequired, // передано от родителя
    cartProducts:PropTypes.array.isRequired, // передано от родителя
  };

  state ={ 
    priceDelivery:6,
    classAnswer:'InfoClientButtonYes',
    classInfoRecipient:'InfoRecipientHidden',
    classOneVariant:'',
    classTwoVariant:'',

    validAllForm:false,
    //значения формы:
    valueFamClient:'',
    valueNameClient:'',
    valueOtchClient:'',
    valuePhoneClient:'',
    valueEmailClient:'',

    answer:'Client',//да - клиент сам получает товар, нет - получает получатель 

    valueFamRecipient:'',
    valueNameRecipient:'',
    valueOtchRecipient:'',
    valuePhoneRecipient:'',
    
    variantDelivery:'',
    valueDate:'',
    valueTimeFrom:'',
    valueTimeTo:'',
    valueAdress:'',
    valueDescription:'',
    valueComment:'',
    valueOplata:'',

    //ошибки:
    ERRFamClient:null,
    ERRNameClient:null,
    ERROtchClient:null,
    ERRPhoneClient:null,
    ERREmailClient:null,

    ERRFamRecipient:null,
    ERRNameRecipient:null,
    ERROtchRecipient:null,
    ERRPhoneRecipient:null,

    ERRVariantDelivery:null,
    ERRDate:null,
    ERRTimeFrom:null,
    ERRTimeTo:null,
    ERRAdress:null,
    ERRDescription:null,
    ERRComment:null,
    ERROplata:null,
    
    chooseAllform:false,
  }

  clickWhoGets =()=>{
     (this.state.answer==='Client')?
     this.setState({answer:'Recipient',classAnswer:'InfoClientButtonNo',classInfoRecipient:'InfoRecipient'})
     :this.setState({answer:'Client',classAnswer:'InfoClientButtonYes',classInfoRecipient:'InfoRecipientHidden'});
  }

  setVariantDeliveryOne =(EO)=>{
    this.setState({variantDelivery:'courier',classOneVariant:'choice',classTwoVariant:''});
  }

  setVariantDeliveryTwo =(EO)=>{
    this.setState({variantDelivery:'pickup',classOneVariant:'',classTwoVariant:'choice'});
  }

  changedText=(EO)=>{
    EO.stopPropagation();
    switch(EO.target.name){
      case 'famClient':
        this.setState( {valueFamClient:EO.target.value} );
        break;
      case 'nameClient':
        this.setState( {valueNameClient:EO.target.value});
        break;
      case 'otchClient':
        this.setState( {valueOtchClient:EO.target.value});
        break;    
      case 'phoneClient':
        this.setState( {valuePhoneClient:EO.target.value});
        break;
      case 'emailClient':
        this.setState( {valueEmailClient:EO.target.value} );
        break;

      case 'famRecipient':
        this.setState( {valueFamRecipient:EO.target.value});
        break;
      case 'nameRecipient':
        this.setState( {valueNameRecipient:EO.target.value});
        break;
      case 'otchRecipient':
        this.setState( {valueOtchRecipient:EO.target.value} );
        break;    
      case 'phoneRecipient':
        this.setState( {valuePhoneRecipient:EO.target.value});
        break;
      
      case 'date':
        this.setState( {valueDate:EO.target.value} );
        break;
      case 'timeFrom':
        this.setState( {valueTimeFrom:EO.target.value});
        break;
      case 'timeTo':
        this.setState( {valueTimeTo:EO.target.value} );
        break;  
      case 'adress':
        this.setState( {valueAdress:EO.target.value} );
        break;
      case 'description':
        this.setState( {valueDescription:EO.target.value} );
        break;
      case 'oplata':
        this.setState( {valueOplata:EO.target.value} );
        break;
      case 'comment':
        this.setState( {valueComment:EO.target.value} );
        break;                        
    }
         
  }


  validFormСlientFam = ()=>{ 
    (this.state.valueFamClient==='')
      ?this.setState( {ERRFamClient:'Укажите фамилию!'} ):this.setState( {ERRFamClient:null} );    
  }

  validFormСlientName = ()=>{
    (this.state.valueNameClient==='')
      ?this.setState( {ERRNameClient:'Укажите имя!'} ):this.setState( {ERRNameClient:null} );
  }

  validFormСlientOtch = ()=>{
    (this.state.valueOtchClient==='')
      ?this.setState( {ERROtchClient:'Укажите отчество!'} ):this.setState( {ERROtchClient:null} );
  }

  validFormСlientPhone = ()=>{
    (this.state.valuePhoneClient==='')
      ?this.setState( {ERRPhoneClient:'Укажите номер телефона!'} ):
      
    ((/\+375 *[0-9]{2} *[0-9]{7}/.test(this.state.valuePhoneClient)!==true)&&(this.state.valuePhoneClient!==''))
      ?this.setState( {ERRPhoneClient:'Укажите номер в формате +375 29 1234567 !'} ):this.setState( {ERRPhoneClient:null} );
  }

  validFormСlientEmail = ()=>{
    (this.state.valueEmailClient==='')
      ?this.setState( {ERREmailClient:'Укажите Ваш email !'} ):
      
    ((/\w+@[a-z.]+/.test(this.state.valueEmailClient)!==true)&&(this.state.valueEmailClient!==''))
      ?this.setState( {ERREmailClient:'Укажите именно email !'} ):this.setState( {ERREmailClient:null} ); 
  }

  validFormRecipientFam = ()=>{
    if(this.state.answer==='Recipient'){
      (this.state.valueFamRecipient==='')
        ?this.setState( {ERRFamRecipient:'Укажите фамилию получателя!'} ):this.setState( {ERRFamRecipient:null} );
    }    
  }

  validFormRecipientName = ()=>{
    if(this.state.answer==='Recipient'){  
      (this.state.valueNameRecipient==='')
        ?this.setState( {ERRNameRecipient:'Укажите имя получателя!'} ):this.setState( {ERRNameRecipient:null} );
    }    
  }

  validFormRecipientPhone = ()=>{
    if(this.state.answer==='Recipient'){  
    (this.state.valuePhoneRecipient==='')
      ?this.setState( {ERRPhoneRecipient:'Укажите номер телефона получателя!'} ):
      
    ((/\+375 *[0-9]{2} *[0-9]{7}/.test(this.state.valuePhoneRecipient)!==true)&&(this.state.valuePhoneRecipient!==''))
      ?this.setState( {ERRPhoneRecipient:'Укажите номер в формате +375 29 1234567 !'} ):this.setState( {ERRPhoneRecipient:null} );
    }
  }

  validFormDeliveryVariant=()=>{
    (this.state.variantDelivery==='')
        ?this.setState( {ERRVariantDelivery:'Укажите вариант доставки!'} ):this.setState( {ERRVariantDelivery:null} );
  }

  validFormDeliveryDate=()=>{
    (this.state.valueDate===''&&(this.state.variantDelivery==='courier'||this.state.variantDelivery===''))
      ?this.setState( {ERRDate:'Укажите дату доставки!'} ):this.setState( {ERRDate:null} );
  }

  validFormDeliveryTimeFrom=()=>{
    (this.state.valueTimeFrom===''&&(this.state.variantDelivery==='courier'||this.state.variantDelivery===''))
        ?this.setState( {ERRTimeFrom:'Укажите интервал времени!'} ):this.setState( {ERRTimeFrom:null} );
  }

  validFormDeliveryTimeTo=()=>{
    (this.state.valueTimeTo===''&&(this.state.variantDelivery==='courier'||this.state.variantDelivery===''))
        ?this.setState( {ERRTimeTo:'Укажите интервал времени!'} ):this.setState( {ERRTimeTo:null} );
  }

  validFormDeliveryAdress=()=>{
    (this.state.valueAdress===''&&(this.state.variantDelivery==='courier'||this.state.variantDelivery===''))
        ?this.setState( {ERRAdress:'Укажите адрес!'} ):this.setState( {ERRAdress:null} );
  }

  validFormDeliveryDescription=()=>{
    (this.state.valueDescription==='')
        ?this.setState( {ERRDescription:'Укажите, что написать в карточке к букету!'} ):this.setState( {ERRDescription:null} );
  }

  validFormDeliveryOplata=()=>{
    (!this.state.valueOplata)
        ?this.setState( {ERROplata:'Укажите вариант оплаты!'} ):this.setState( {ERROplata:null} );
  }

  validAllForm =()=>{
    this.validFormСlientFam();
    this.validFormСlientName();
    this.validFormСlientOtch();
    this.validFormСlientPhone();
    this.validFormСlientEmail();
    this.validFormRecipientFam();
    this.validFormRecipientName();
    this.validFormRecipientPhone();
    this.validFormDeliveryVariant();
    this.validFormDeliveryDate();
    this.validFormDeliveryTimeFrom();
    this.validFormDeliveryTimeTo();
    this.validFormDeliveryAdress();
    this.validFormDeliveryDescription();
    this.validFormDeliveryOplata();

    this.setState({chooseAllform:true},this.validAllFormChoose);
  }

    validAllFormChoose =()=>{
    if(
    !this.state.ERRFamClient&&
    !this.state.ERRNameClient&&
    !this.state.ERROtchClient&&
    !this.state.ERRPhoneClient&&
    !this.state.ERREmailClient&&
    !this.state.ERRVariantDelivery&&
    !this.state.ERRDate&&
    !this.state.ERRTimeFrom&&
    !this.state.ERRTimeTo&&
    !this.state.ERRAdress&&
    !this.state.ERRDescription&&
    !this.state.ERRComment&&
    !this.state.ERROplata){
      if(this.state.answer==='Recipient'){
         if(!this.state.ERRFamRecipient&&
            !this.state.ERRNameRecipient&&
            !this.state.ERROtchRecipient&&
            !this.state.ERRPhoneRecipient){
          this.setState({validAllForm:true},this.sendOrder);
         }else{
          this.setState({validAllForm:false});
         }
      }else{
        this.setState({validAllForm:true},this.sendOrder);
        console.log(this.state.validAllForm);
      }
    }else{
      this.setState({validAllForm:false});
     }
  }

  
  clicksendOrder=(EO)=>{
    EO.stopPropagation();
    this.validAllForm();
  }

  sendOrder =()=>{
    console.log(this.state.validAllForm);
    if(this.state.validAllForm){
      var totalPrice=this.props.price;
      if(this.state.variantDelivery==='courier'){
        totalPrice=totalPrice+this.state.priceDelivery;
        console.log( totalPrice);
      }
    let order={
      id:null,
      famClient:this.state.valueFamClient,
      nameClient:this.state.valueNameClient,
      otchClient:this.state.valueOtchClient,
      phoneClient:this.state.valuePhoneClient,
      emailClient:this.state.valueEmailClient,
      whoGets:this.state.answer,
      famRecipient:this.state.valueFamRecipient,
      nameRecipient:this.state.valueNameRecipient,
      otchRecipient:this.state.valueOtchRecipient,
      phoneRecipient:this.state.valuePhoneRecipient,
      variantDelivery:this.state.variantDelivery,
      date:this.state.valueDate,
      timeFrom:this.state.valueTimeFrom,
      timeTo:this.state.valueTimeTo,
      adress:this.state.valueAdress,
      description:this.state.valueDescription,
      comment:this.state.valueComment,
      oplata:this.state.valueOplata,
      products:this.props.cartProducts,
      price:totalPrice,      
    };
    saveStringDataForServer(order);
    }  
  }  

  render() { 
    return (
      <div className='Order'>
        <div className='InfoPerson'>
          <div className='InfoClient'>
              <h3>Информация о заказчике</h3>
              <div className='InfoClientBlock'>
                <p>{'Ваша фамилия* '}<span className='Err'>{this.state.ERRFamClient}</span></p>
                <input type='text' name='famClient' value={this.state.valueFamClient} placeholder="Иванов" onBlur={this.validFormСlientFam} onChange={this.changedText}/>
              </div>
              <div className='InfoClientBlock'>
                <p>{'Ваше имя* '}<span className='Err'>{this.state.ERRNameClient}</span></p>
                <input type='text' name='nameClient' value={this.state.valueNameClient} placeholder="Иван" onBlur={this.validFormСlientName} onChange={this.changedText}/>
              </div>
              <div className='InfoClientBlock'>
                <p>{'Ваше отчество* '} <span className='Err'>{this.state.ERROtchClient}</span></p>
                <input type='text' name='otchClient' value={this.state.valueOtchClient} placeholder="Иванович" onBlur={this.validFormСlientOtch} onChange={this.changedText}/>
              </div>
              <div className='InfoClientBlock'>
                <p>{'Ваш телефон* '}<span className='Err'>{this.state.ERRPhoneClient}</span></p>
                <input type='text' name='phoneClient' value={this.state.valuePhoneClient} placeholder="+375 29 1234567" onBlur={this.validFormСlientPhone} onChange={this.changedText}/>
              </div>
              <div className='InfoClientBlock'>
                <p>{'Ваш e-mail* '}<span className='Err'>{this.state.ERREmailClient}</span></p>
                <input type='text' name='emailClient' value={this.state.valueEmailClient} placeholder="Для уведомлений о заказе" onBlur={this.validFormСlientEmail} onChange={this.changedText}/>
              </div>
              <div className='InfoClientBlock'>
                <span>{'Получать цветы будете Вы? '}</span>
                <input className={this.state.classAnswer} type='button' name='button' value={this.state.answer==='Client'?'Да':'Нет'} onClick={this.clickWhoGets}/>
              </div>
          </div>
          <div className={this.state.classInfoRecipient}>
              <h3>Информация о получателе</h3>
              <div className='InfoRecipientBlock'>
                <p>{'Фамилия получателя* '}<span className='Err'>{this.state.ERRFamRecipient}</span></p>
                <input type='text' name='famRecipient' value={this.state.valueFamRecipient} placeholder="Иванов" onBlur={this.validFormRecipientFam} onChange={this.changedText}/>
              </div>
              <div className='InfoRecipientBlock'>
                <p>{'Имя получателя* '}<span className='Err'>{this.state.ERRNameRecipient}</span></p>
                <input type='text' name='nameRecipient' value={this.state.valueNameRecipient} placeholder="Иван" onBlur={this.validFormRecipientName} onChange={this.changedText}/>
              </div>
              <div className='InfoRecipientBlock'>
                <p>{'Отчество получателя '}</p>
                <input type='text' name='otchRecipient' value={this.state.valueOtchRecipient} placeholder="Иванович"  onChange={this.changedText}/>
              </div>
              <div className='InfoRecipientBlock'>
                <p>{'Телефон получателя* '}<span className='Err'>{this.state.ERRPhoneRecipient}</span></p>
                <input type='text' name='phoneRecipient' value={this.state.valuePhoneRecipient} placeholder="+375 29 1234567" onBlur={this.validFormRecipientPhone} onChange={this.changedText}/>
              </div>
          </div>
        </div>
         
         <div className='InfoDelivery'>
              <div className='InfoDeliveryBlock'>
                <p>{'Варианты доставки* '} <span className='Err'>{this.state.ERRVariantDelivery}</span></p>
                <div className='OptionsDelivery'>
                   <div className={'OptionDelivery '+this.state.classOneVariant} onClick={this.setVariantDeliveryOne}>
                     <img src={delivery}></img>
                     <p className='OptionDeliveryMethod'>Курьер</p>
                     <p className='OptionDeliveryPrice'>6.00 руб.</p>
                   </div>
                   <div className={'OptionDelivery '+this.state.classTwoVariant} onClick={this.setVariantDeliveryTwo}>
                     <img src={pickup}></img>
                     <p className='OptionDeliveryMethod'>Самовывоз</p>
                     <p className='OptionDeliveryPrice'>Бесплатно</p>
                   </div>
                </div>
                
              </div>
              <div className='InfoDeliveryDateAndTime'>
                  <div className='InfoDeliveryBlock'>
                     <p>{'Желаемая дата доставки* '}<span className='Err'>{this.state.ERRDate}</span></p>
                     <input type='date' name='date' value={this.state.valueDate} placeholder="Например 01.01.2021" disabled={this.state.variantDelivery==='pickup'} onBlur={this.validFormDeliveryDate} onChange={this.changedText}/>
                  </div>
                  <div className='InfoDeliveryBlock'>
                     <p>{'Желаемое время доставки* '}<span className='Err'>{this.state.ERRTimeFrom||this.state.ERRTimeTo}</span></p>
                     <div className='InfoDeliveryTime'>
                     <span>c </span><input type='time' name='timeFrom' value={this.state.valueTimeFrom}  disabled={this.state.variantDelivery==='pickup'} onBlur={this.validFormDeliveryTimeFrom} onChange={this.changedText}/>
                     <span>до </span><input type='time' name='timeTo' value={this.state.valueTimeTo}  disabled={this.state.variantDelivery==='pickup'} onBlur={this.validFormDeliveryTimeTo} onChange={this.changedText}/>
                     </div>
                  </div>
              </div>
              
              <div className='InfoDeliveryBlock'>
                <p>{'Адрес доставки* '}<span className='Err'>{this.state.ERRAdress}</span></p>
                <input type='text' name='adress' value={this.state.valueAdress} placeholder="г.Минск, ул.Минская, 5" disabled={this.state.variantDelivery==='pickup'} onBlur={this.validFormDeliveryAdress} onChange={this.changedText}/>
              </div>
              <div className='InfoDeliveryBlock'>
                <p>{'Надпись на карточке к букету* '}<span className='Err'>{this.state.ERRDescription}</span></p>
                <textarea name='description' rows="6" cols="70" value={this.state.valueDescription} placeholder="Укажите, что написать к карточке к букету" onBlur={this.validFormDeliveryDescription} onChange={this.changedText}/>
              </div>
              <div className='InfoDeliveryBlock'>
                <p>{'Варианты оплаты* '}<span className='Err'>{this.state.ERROplata}</span></p>
                <div>
                   <input type='radio' name='oplata'  value="nal" id='nal' onBlur={this.validFormDeliveryOplata} onChange={this.changedText}/><label htmlFor="nal">Оплата наличными</label>
                   <input type='radio' name='oplata' value="kart"  id='kart' onBlur={this.validFormDeliveryOplata} onChange={this.changedText}/><label htmlFor="kart">Оплата картой</label>
                </div>
                
              </div>
              <div className='InfoDeliveryBlock'>
                <p>{'Добавить комментарий к заказу'}</p>
                <textarea name='comment' rows="6" cols="70" value={this.state.valueComment} placeholder="Укажите пожелания к заказу" onChange={this.changedText}/>
              </div>

              <input className='sendOrder' type='button' name='buttonSendOrder' value='Оформить заказ'  onClick={this.clicksendOrder}/>
         </div>
      </div>
    );
  }
  }

  
  export default FormOrder;