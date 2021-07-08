import React from 'react';
import PropTypes from 'prop-types';
import {clickEvents} from '../../events';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './FilterByPrice.css';
import './FilterByPrice_media.css';

class FilterByPrice extends React.PureComponent{
    
    static propTypes = {
      
      listProd:PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          code: PropTypes.number.isRequired,
          count: PropTypes.number.isRequired,
          expected: PropTypes.number,
          price: PropTypes.string.isRequired,          
          view: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired, 
        }) //получено от родителя
      ),
      filterPriceMax:PropTypes.number.isRequired,//получено от родителя
    };

    state = { 
      filterPriceMin:0,
      filterPriceMax: this.props.filterPriceMax,      
      left:0,
      right:0,
      zIndexOne:1,
      zIndexTwo:2,
      appearFilter:'',      
    };

    range=null;//слайдер
    shiftXIndOne=null;//координата
    shiftXIndTwo=null;//координата
    IndOne=null;//первый индикатор
    IndTwo=null;//второй индикатор
    widthMidleFon=null;

    setRange=(ref)=>{
       this.range=ref;
    }

    clickFilterName =()=>{
      if(this.state.appearFilter===''){
        this.setState({
          appearFilter:'appearFilter',
        })
      }else{
        this.setState({
          appearFilter:'',
        })
      }
       
    }

    componentDidMount = ()=>{
      clickEvents.addListener('EVupdateFilterPrice',this.filterUpdata);     
    }

    componentWillUnmount = ()=>{
      clickEvents.removeListener('EVupdateFilterPrice',this.filterUpdata);        
    }

    filterUpdata = ()=>{
      this.setState({left:0, right:0,filterPriceMin:0, filterPriceMax: this.props.filterPriceMax, zIndexOne:1, zIndexTwo:2});
    }

    indicatorMousedownIndOne = (EO)=> {
      EO.preventDefault(); // предотвращаем выделения на странице
      let w=EO.target;//узнаем какой индикатор выбрали

        this.IndOne=w;//запомнили его
        let shiftXIndOne = EO.clientX - w.getBoundingClientRect().left;
        this.shiftXIndOne=shiftXIndOne;
       // document.body.appendChild(w);
      // shiftY здесь не нужен, индикатор двигается только по горизонтали

      document.addEventListener('mousemove',this.onMouseMoveIndOne);
      document.addEventListener('mouseup', this.onMouseUpIndOne);
    };

    onMouseMoveIndOne =(EO) =>{

      let newLeft = EO.clientX - this.shiftXIndOne - this.range.getBoundingClientRect().left;

      // курсор вышел из слайдера => оставляем индикатор в его границах.
      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge = this.range.offsetWidth - this.IndOne.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      let newfilterPriceMin=Math.ceil((newLeft)*this.props.filterPriceMax/(this.range.offsetWidth- this.IndOne.offsetWidth));
      if(newfilterPriceMin>=this.state.filterPriceMax){
        newfilterPriceMin=this.state.filterPriceMax;
        newLeft = (this.range.offsetWidth- this.IndOne.offsetWidth)*this.state.filterPriceMax/this.props.filterPriceMax;
      }
      this.widthMidleFon=this.range-this.right-newLeft;
      this.setState({left:newLeft, filterPriceMin:newfilterPriceMin, zIndexOne:2, zIndexTwo:1});
    }

    onMouseUpIndOne = ()=> {
      document.removeEventListener('mouseup', this.onMouseUpIndOne);
      document.removeEventListener('mousemove', this.onMouseMoveIndOne);
     
    }

    indicatorMousedownIndTwo = (EO)=> {
      EO.preventDefault(); // предотвращаем выделения на странице
      let w=EO.target;//узнаем какой индикатор выбрали

        this.IndTwo=w;//запомнили его
        let shiftXIndTwo = EO.clientX - w.getBoundingClientRect().right;
        this.shiftXIndTwo=shiftXIndTwo;  
        //document.body.appendChild(w);
      // shiftY здесь не нужен, индикатор двигается только по горизонтали

      document.addEventListener('mousemove',this.onMouseMoveIndTwo);
      document.addEventListener('mouseup', this.onMouseUpIndTwo);
    };

    onMouseMoveIndTwo =(EO) =>{
      
      let newRight = - EO.clientX + this.shiftXIndTwo + this.range.getBoundingClientRect().right;

      // курсор вышел из слайдера => оставляем индикатор в его границах.
      if (newRight < 0) {
        newRight = 0;
      }
      let leftEdge = this.range.offsetWidth - this.IndTwo.offsetWidth;
      if (newRight > leftEdge) {
        newRight = leftEdge;
      }
      let newfilterPriceMax=Math.ceil((this.range.offsetWidth-newRight-this.IndTwo.offsetWidth)*this.props.filterPriceMax/(this.range.offsetWidth- this.IndTwo.offsetWidth));
      if(newfilterPriceMax<=this.state.filterPriceMin){
        newfilterPriceMax=this.state.filterPriceMin;
        newRight = (this.range.offsetWidth- this.IndTwo.offsetWidth)-(this.range.offsetWidth- this.IndTwo.offsetWidth)*this.state.filterPriceMin/this.props.filterPriceMax;
      }
      this.widthMidleFon=this.range-this.left-newRight;
      this.setState({right:newRight, filterPriceMax:newfilterPriceMax, zIndexOne:1, zIndexTwo:2});
      
    }

    onMouseUpIndTwo = ( )=> {
      document.removeEventListener('mouseup', this.onMouseUpIndTwo);
      document.removeEventListener('mousemove', this.onMouseMoveIndTwo);
      
    }

    addFilterPrice =()=>{
      clickEvents.emit('EVclickFilterPrice',this.state.filterPriceMax,this.state.filterPriceMin);
    }

    render() {
     
      
      return ( 
        
        <div className='filterByPrice'>
            <p className='filterName' onClick={this.clickFilterName}><FontAwesomeIcon className='filterNameIcon' icon={faAngleDown} size='2x' /><span>Фильтр по цене</span></p>  
            <div className={'filter '+this.state.appearFilter}>
              <div className='range' ref={this.setRange}>
                
                <div className='fon midleFon' style={{width:this.widthMidleFon?this.widthMidleFon:'100%'}}></div>
                <div className='fon' style={{width:this.state.left}}></div>
                <div className='fon rightFon' style={{width:this.state.right}}></div>
                <div className='indicatorOne' onMouseDown={this.indicatorMousedownIndOne} onDragStart={()=>false} style={{left:this.state.left,zIndex:this.state.zIndexOne}}></div>
                <div className='indicatorTwo' onMouseDown={this.indicatorMousedownIndTwo} onDragStart={()=>false} style={{right:this.state.right,zIndex:this.state.zIndexTwo}}></div>
              </div>
              <p className='FilterPrice'>{`${this.state.filterPriceMin} руб. - ${this.state.filterPriceMax} руб.`}</p>
              <button className='FilterButton' onClick={this.addFilterPrice}>
                      Отфильтровать
              </button>
              
            </div>
        </div>       
      );      
    }
  
  }

  export default FilterByPrice;

  