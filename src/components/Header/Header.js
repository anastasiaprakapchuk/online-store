import React from 'react';
import {NavLink} from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBorderStyle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import logo from './logo.png';

import './Header.css';
import './Header_media.css';
import CartCounter from '../CartCounter/CartCounter';
import FavoritesCounter from '../FavoritesCounter/FavoritesCounter';

class Header extends React.PureComponent {
   state={
      search:false,
   }

   navigator=null;
   header=null;

  setNavigator = (ref)=>{
    this.navigator=ref;
  }

  setHeader = (ref) =>{
   this.header=ref;
  }

  componentDidMount =()=>{
   window.addEventListener('scroll',this.windowScroll);
  }

  componentWillUnmount =()=>{
   window.removeEventListener('scroll',this.windowScroll);
  }

  windowScroll = ()=>{
   
        if (window.pageYOffset>0){
           this.header.className='Header headerFixed';
          
        }else{
           this.header.className='Header';
        }
     
  }

   appearCursor = (EO)=>{
      EO.currentTarget.style='cursor:pointer';
   }

   clickNavigatorBar = ()=>{
      if(this.navigator){
      this.navigator.className='appearBar';
      this.navigator.firstChild.className='MenuCloseAppear';
      }
   }

   clickMenuClose = ()=>{
      this.navigator.className='Navigator';
      this.navigator.firstChild.className='MenuCloseHide';
   }

   clickSearch = ()=>{
      this.setState({search:true});
   }

   render(){
    return (
      
        <header className="Header" ref={this.setHeader}>
         
            <div className='row'>
               

              <div className='col-1 loloCol'>
                 <img src={logo} alt=''/>
              </div>

              <div className='col-1 rectangleCol1'>
                 <div className='rectangle'></div>
              </div>

              <div className='col-1'>
                <div className='Navigator' ref={this.setNavigator}>
                   <div className='MenuCloseHide'><FontAwesomeIcon  icon={faChevronLeft} onMouseEnter={this.appearCursor} onClick={this.clickMenuClose}/></div>
                   <NavLink to="/" exact className='MenuNavigator FirstMenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Главная</NavLink>
                   <NavLink to="/catalog" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Каталог</NavLink> 
                   <NavLink to="/info" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Информация</NavLink>
                   <NavLink to="/contacts" className='MenuNavigator' activeClassName='SActivated' onClick={()=>window.scrollTo(0,0)}>Контакты</NavLink>
                </div>
                
              </div>

              <div className='col-1 rectangleCol1'>
                 <div className='rectangle'></div>
              </div>
                
              <div className='col-1 barCol1'>
                  <div className='flexWith'>
                     <div className='NavigatorBar'><FontAwesomeIcon icon={faBars} size='2x' onMouseEnter={this.appearCursor} onClick={this.clickNavigatorBar}/> </div>  
                     <div className='headerExtra'>                      
                          <div className='selectIcon' onClick={this.clickSearch}>
                             <FontAwesomeIcon icon={faSearch}/>

                             <p className={this.state.search?'AppearSearch':'HideSearch'}>
                                <input type='search'/>
                                <button><FontAwesomeIcon icon={faSearch}/></button>
                             </p>
                          </div>
                          <NavLink to="/favorites" className='selectIcon' onClick={()=>window.scrollTo(0,0)}><FontAwesomeIcon icon={faHeart}/><FavoritesCounter/></NavLink>
                          <NavLink to="/shopcart" className='selectIcon' onClick={()=>window.scrollTo(0,0)}><FontAwesomeIcon icon={faShoppingCart} /><CartCounter/></NavLink>
                     </div>
                  </div>
                  
              </div>

            </div>
                 
        </header>
     
    );
   }
  }

export default Header;  