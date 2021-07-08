import isoFetch from 'isomorphic-fetch';
import {saveOrderEvents} from '../events';
import {connect} from 'react-redux';

const saveDataForServer =(state) =>{

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
var newStringForServer=null;

const updateDate = ()=>{
  
  
  let newState={productList:state.productList.data,
                imagesInfo:state.imagesInfo.data,
                contactsInfo:state.contactsInfo.data,
                orders:state.orders.data};
  
  newStringForServer=JSON.stringify(newState);
  
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
  //saveOrderEvents.emit('EVSuccessSaveOrder',order);//вопрос?
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
    let data=await response;
    UPDATEfetchSuccess(data);
  } 
  catch ( error )  {
    fetchError(error.message);
  }

};
LOCKGETDataForServer();
}

export {saveDataForServer};
