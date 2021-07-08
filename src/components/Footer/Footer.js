import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import logo from './logo.png';

import './Footer.css';
import './Footer_media.css';

class Footer extends React.Component {
   static propTypes ={
      contactsInfo:PropTypes.object.isRequired,//от родителя
    };
    

   navigator=null;

  setNavigator = (ref)=>{
    this.navigator=ref;
  }

   appearCursor = (EO)=>{
      EO.currentTarget.style='cursor:pointer';
   }

   render(){
      //console.log(this.props.contactsInfo);
    return (
      
        <footer className="Footer">
         
              <div className='logoFooter'>
                 <img src={logo} alt=''/>
              </div>

              <div className='menuFooter'>
                
                <div className='NavigatorFooter' ref={this.setNavigatorFooter}>                   
                   <NavLink to="/" exact className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Главная</NavLink>
                   <NavLink to="/catalog" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Каталог</NavLink> 
                   <NavLink to="/info" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Информация</NavLink>
                   <NavLink to="/contacts" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Контакты</NavLink>
                </div>
                
              </div>

              <div className='ContactsFooter'>
                 <div className='phones'>
                    <FontAwesomeIcon className='icon' icon={faPhoneVolume} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.phone.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
                 <div className='adress'>
                    <FontAwesomeIcon className='icon' icon={faMapMarkedAlt} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.adress.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
                 <div className='email'>
                    <FontAwesomeIcon className='icon' icon={faEnvelope} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.email.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
              </div>

              <div className='copyright'>
                   Copyright © 2021 AnastasiaPrakapchuk
              </div>   
        </footer>
     
    );
   }
  }

     
 export default Footer;
