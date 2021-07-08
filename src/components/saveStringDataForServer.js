import isoFetch from 'isomorphic-fetch';
import {saveOrderEvents} from '../events';

const saveStringDataForServer =(order) =>{

var nameString='PROKOPCHUK_CURSPROJECT_SHOPFLOWERS';
var password=Math.random();
var copiaPassword=password;

var sp=new URLSearchParams();
        sp.append('f','LOCKGET');
        sp.append('n',nameString);
        sp.append('p',password);

var fetchConfig={
  URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
  method: 'post',
  body:sp,
};

var spUPDATE;

var UPDATEfetchConfig;

var loadAllData=null;
var loadOrders=null;
var loadProductList=null;
var newLoadAllData;
var newProductList;
var newOrders;
var newStringForServer=null;

const updateDate = ()=>{
  loadOrders=loadAllData.orders;
  loadProductList=loadAllData.productList;
  newLoadAllData={...loadAllData};
  newProductList=[...loadProductList];
  newOrders=[...loadOrders];

  if(loadOrders.length===0){
    order.id=1;
  }else{
    order.id=loadOrders[loadOrders.length-1].id+1;
  }
  
  newOrders.push(order);

  order.products.forEach(v => {
    let index=loadProductList.findIndex(s => v.product.code===s.code);
    newProductList.splice(index,1,v.product);  
  });
  newLoadAllData.orders=newOrders;
  newLoadAllData.productList=newProductList;

  newStringForServer=JSON.stringify(newLoadAllData);
  
  spUPDATE=new URLSearchParams();
        spUPDATE.append('f','UPDATE');
        spUPDATE.append('n',nameString);
        spUPDATE.append('v',newStringForServer);
        spUPDATE.append('p',copiaPassword);

UPDATEfetchConfig={
  URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
  method: 'post',
  body:spUPDATE,
};
  UPDATEDataForServer();
}

const fetchError = (errorMessage) => {
  console.error(errorMessage);
};

const fetchSuccess = (loadedData) => { 
    loadAllData=loadedData;
    updateDate();
};

const UPDATEfetchSuccess = (data) => { 
  console.log(data);
  saveOrderEvents.emit('EVSuccessSaveOrder',order);
};

const LOCKGETDataForServer = async () => {

  try {
    let response=await isoFetch(fetchConfig.URL, fetchConfig);
    if (!response.ok) {
      throw new Error("fetch error " + response.status);
    }
    let data=await response.json();
   
    fetchSuccess(JSON.parse(data.result));
  } 
  catch ( error )  {
    fetchError(error.message);
  }

};

const UPDATEDataForServer = async () => {

  try {
    let response=await isoFetch(UPDATEfetchConfig.URL, UPDATEfetchConfig);
    if (!response.ok) {
      throw new Error("fetch error " + response.status);
    }
    let data=await response.json();
    UPDATEfetchSuccess(data);
  } 
  catch ( error )  {
    fetchError(error.message);
  }

};
LOCKGETDataForServer();
}

export {saveStringDataForServer};