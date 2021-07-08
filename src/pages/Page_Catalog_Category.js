import React from 'react';

import ListProd from '../components/ListProd/ListProd';
import Categories from '../components/Categories/Categories';
import productList from '../productList.json';

class Page_Catalog_Category extends React.Component {
   
  render() {
    var productCategory=this.props.match.params.clid;
    
    console.log('render Page_Catalog_Category');
   
    var c=this.props.listProd.filter( v => v.category===productCategory);//filter возвращает новый массив
    //c.forEach(v => {v.view='../../'+v.view});//костыль

    return (
      
        <ListProd listProd={c}/>      
      
    );
    
  }

}
    
export default Page_Catalog_Category;
    