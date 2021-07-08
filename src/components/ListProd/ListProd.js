import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {clickEvents} from '../../events';
import './ListProd.css';
import './ListProd_media.css';
import Product from '../Product/Product';

export class ListProd extends React.PureComponent{
    
    static propTypes = {      
      listProd:PropTypes.array.isRequired,//получено от родителя 
      options:PropTypes.object.isRequired, // передано из Redux
      
    };

    state ={
      maxPrice:null,
      minPrice:null,
      filterPrice:false,
    };
   
    
    componentDidMount = ()=>{
      clickEvents.addListener('EVclickFilterPrice',this.filterForPrice);     
    }

    componentWillUnmount = ()=>{
      clickEvents.removeListener('EVclickFilterPrice',this.filterForPrice); 
      clickEvents.emit('EVupdateFilterPrice');    
    }

    filterForPrice = (maxPrice,minPrice) =>{
      this.setState({maxPrice:maxPrice,
        minPrice:minPrice,
        filterPrice:true,})
    }

    render() {
     console.log('renderListProd');
     var newCurrentList;

     if(this.state.filterPrice){
     newCurrentList=this.props.listProd.filter((v)=>{return ((this.state.minPrice<=parseFloat(v.price))&&(parseFloat(v.price)<=this.state.maxPrice))});
     console.log(newCurrentList);
     }
     else{
     newCurrentList=this.props.listProd;
     }

      if(this.props.options.currentSelect==='По умолчанию'){
         newCurrentList.sort( (a,b) => a.code-b.code);
      }
      if(this.props.options.currentSelect==='По популярности'){
         //доделать!!!!
      }
      if(this.props.options.currentSelect==='По скидкам'){
         //доделать!!!!
      }
      if(this.props.options.currentSelect==='По возрастанию цены'){
         newCurrentList.sort( (a,b) => parseFloat(a.price)-parseFloat(b.price));
         console.log(newCurrentList);
      }
      if(this.props.options.currentSelect==='По убыванию цены'){
         newCurrentList.sort( (a,b) => parseFloat(b.price)-parseFloat(a.price));
         console.log(newCurrentList);
      }
     
      var list=newCurrentList.map(v=>                   
        <Product key={v.code} info={v} workMode={this.props.options.workMode}/> 
      );
      
      return ( 
        <div className='flexList'>
          {list}        
        </div>       
      );      
    }
  
  }

  const mapStateToProps = function (state) {
    return {   
      options: state.options,      
    };
  };
  
  export default connect(mapStateToProps)(ListProd);
