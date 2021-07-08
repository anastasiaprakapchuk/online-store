import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Page_About from './Page_About';
import Page_Catalog from './Page_Catalog';

import Page_CardProd from './Page_CardProd';
import Page_Info from './Page_Info';
import Page_Contacts from './Page_Contacts';
import Page_ShopCart from './Page_ShopCart';
import Page_Favorites from './Page_Favorites';
import Page_Admin from './Page_Admin';
import Page_LoginAdmin from './Page_LoginAdmin';
import './PagesRouter.css';//бесполезно
var logged=false;

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div className='PagesRouter'>
        <Route path="/" exact component={Page_About} />
        <Route path="/catalog" render={()=><Page_Catalog/>} />
        
        <Route path="/productCard/:clid" component={Page_CardProd} />
        <Route path="/info" component={Page_Info} />
        <Route path="/contacts" component={Page_Contacts} />
        
        <Route path="/favorites" component={Page_Favorites} />
        <Route path="/shopcart" component={Page_ShopCart} />
        <Route path="/loginadmin" component={Page_LoginAdmin} />
        <Route path="/admin" component={Page_Admin} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    