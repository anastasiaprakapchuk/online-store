import React from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome} from "@fortawesome/free-solid-svg-icons";
import { faBook} from "@fortawesome/free-solid-svg-icons";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import './HeaderAdmin.css';
import './HeaderAdmin_media.css';

class HeaderAdmin extends React.Component {

   exitFromAdmin = ()=>{
      this.props.history.push('/');
      window.location.reload();
   }

   render(){
    console.log('render HeaderAdmin');
    return (
      
        <header className="HeaderAdmin">
                                 
            <div className='AdminMenuNameExit' onClick={this.exitFromAdmin}>Выход</div>
                            
            <div className='AdminNavigator' ref={this.setNavigator}>
                   <div className='AdminMenuCloseHide'><FontAwesomeIcon  icon={faChevronLeft} onClick={this.clickMenuClose}/></div>
                   <NavLink to="/admin" exact className='AdminMenuNavigator' activeClassName='SActivatedAdmin'>
                     <div><FontAwesomeIcon  icon={faHome} size='2x'/></div>
                     <br/>
                     <div className='AdminMenuName'>Главная</div>
                   </NavLink>
                   <NavLink to="/admin/catalog" className='AdminMenuNavigator' activeClassName='SActivatedAdmin'>
                     <div><FontAwesomeIcon  icon={faBook} size='2x'/></div>
                     <br/>
                     <div className='AdminMenuName'>Каталог</div>
                   </NavLink> 
                   <NavLink to="/admin/orders" className='AdminMenuNavigator' activeClassName='SActivatedAdmin'>
                     <div><FontAwesomeIcon  icon={faShoppingCart} size='2x'/></div>
                     <br/>
                     <div className='AdminMenuName'>Заказы</div>
                   </NavLink>
                   <NavLink to="/admin/pages" className='AdminMenuNavigator' activeClassName='SActivatedAdmin'>
                     <div><FontAwesomeIcon  icon={faWindowRestore} size='2x'/></div>
                     <br/>
                     <div className='AdminMenuName'>Страницы</div>
                   </NavLink>
                   <NavLink to="/admin/statistik" className='AdminMenuNavigator' activeClassName='SActivatedAdmin'>
                     <div><FontAwesomeIcon  icon={faCalendarAlt} size='2x'/></div>
                     <br/>
                     <div className='AdminMenuName'>Статистика</div>
                   </NavLink>
            </div>
           
        </header>
     
    );
   }
  }

export default withRouter(HeaderAdmin);  