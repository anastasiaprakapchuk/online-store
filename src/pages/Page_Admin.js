import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import Page_Admin_Orders from './Page_Admin_Orders';
import Page_Admin_Catalog from './Page_Admin_Catalog';

class Page_Admin extends React.Component {
  state = {
    isPrivate:true,
  }
          
  render() {
    console.log('render 1111');
    return (
      <div className='PageAdmin'>
      <HeaderAdmin/>
      <div>
        <Route path="/admin" exact render={() =><div>Главная админ-страница</div>}/>
        <Route path="/admin/catalog" component={Page_Admin_Catalog}/>
        <Route path="/admin/orders" component={Page_Admin_Orders}/>
        <Route path="/admin/pages" render={() =><div>Контент страниц</div>}/>
        <Route path="/admin/statistik" render={() =><div>Статистика</div>}/>
      </div>
      </div>
    );
    
  }

}
    
export default Page_Admin;
    