import React from 'react';
import PropTypes, { bool } from 'prop-types';
import {connect} from 'react-redux';


import './ContactsInfo.css';
import './ContactsInfo_media.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

class ContactInfo extends React.PureComponent{

  static propTypes = {
    
    contactsInfo:PropTypes.object.isRequired,//получено из Redux
};


    render() { 
     
      return  (
        
       <div className='ContactInfoWithName'>
          <h3>Контактная информация</h3>
          <div className='ContactInfo'>
          <div className='ContactInfoMap'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15794.174548904799!2d27.525080841559358!3d53.95273873330026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbc5bab7705a63%3A0x5a0384314dab875a!2z0YPQu9C40YbQsCDQnNC40L3RgdC60LDRjywg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1615669171929!5m2!1sru!2sby"  
           style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
          </div>

          <div className='ContactInfoContacts'>
                 <div className='phonesContactInfo'>
                    <FontAwesomeIcon className='icon' icon={faPhoneVolume} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.phone.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
                 <div className='adressContactInfo'>
                    <FontAwesomeIcon className='icon' icon={faMapMarkedAlt} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.adress.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
                 <div className='emailContactInfo'>
                    <FontAwesomeIcon className='icon' icon={faEnvelope} size='2x'/>
                    <div className='contacts'>{this.props.contactsInfo.data.email.map(v => <div key={v}>{v}</div>)}</div>
                 </div>
          </div>

          </div>
        </div>
      );
    }
  
  }

  const mapStateToProps = function (state) {
    return {   
      contactsInfo: state.contactsInfo,      
    };
  };

  export default connect(mapStateToProps)(ContactInfo);