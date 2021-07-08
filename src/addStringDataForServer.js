import isoFetch from 'isomorphic-fetch';
import productList from './productList.json';
import imagesInfo from './imagesInfo.json';
import contactsInfo from './contactsInfo.json';

const addStringDataForServer =() =>{

var string={productList:productList,imagesInfo:imagesInfo,contactsInfo:contactsInfo,orders:[]};
var stringForServer=JSON.stringify(string);
var nameString='PROKOPCHUK_CURSPROJECT_SHOPFLOWERS';


//оставляю на случай ошибок-----------------------------------
// var password=Math.random();
// var copiaPassword=password;

// var sp=new URLSearchParams();
//         sp.append('f','LOCKGET');
//         sp.append('n',nameString);
//         sp.append('p',password);

// var fetchConfig={
//   URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
//   method: 'post',
//   body:sp,
// };

// var spUPDATE;
// var UPDATEfetchConfig;
// var loadAllData=null;

// const updateDate = ()=>{
//   spUPDATE=new URLSearchParams();
//         spUPDATE.append('f','UPDATE');
//         spUPDATE.append('n',nameString);
//         spUPDATE.append('v',stringForServer);
//         spUPDATE.append('p',copiaPassword);

// UPDATEfetchConfig={
//   URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
//   method: 'post',
//   body:spUPDATE,
// };
//   UPDATEDataForServer();
// }

// const fetchError = (errorMessage) => {
//   console.error(errorMessage);
// };

// const fetchSuccess = (loadedData) => { 
//     loadAllData=loadedData;
//     updateDate();
// };

// const UPDATEfetchSuccess = (data) => { 
//   console.log(data);
// };

// const LOCKGETDataForServer = async () => {

//   try {
//     let response=await isoFetch(fetchConfig.URL, fetchConfig);
//     if (!response.ok) {
//       throw new Error("fetch error " + response.status);
//     }
//     let data=await response;
   
//     fetchSuccess(data);
//   } 
//   catch ( error )  {
//     fetchError(error.message);
//   }

// };

// const UPDATEDataForServer = async () => {

//   try {
//     let response=await isoFetch(UPDATEfetchConfig.URL, UPDATEfetchConfig);
//     if (!response.ok) {
//       throw new Error("fetch error " + response.status);
//     }
//     let data=await response.json();
//     UPDATEfetchSuccess(data);
//   } 
//   catch ( error )  {
//     fetchError(error.message);
//   }

// };
//LOCKGETDataForServer();





  
let sp=new URLSearchParams();
        sp.append('f','INSERT');
        sp.append('n',nameString);
        sp.append('v',stringForServer);

let fetchConfig={
  URL: "https://fe.it-academy.by/AjaxStringStorage2.php",
  method: 'post',
  body:sp,
};

const fetchErrorloadDataForServer = (errorMessage) => {
  console.error(errorMessage);
  
};

const loadDataForServer = async () => {

  try {
    let response=await isoFetch(fetchConfig.URL, fetchConfig);
    if (response.error!='') {
      console.log(`Строка ${nameString} уже кем-то создана`)
    }else if ( response.result==="ОК" ){
      console.log(`cтрока ${nameString} только-что создана!`)
    }
  } 
  catch ( error )  {
    fetchErrorloadDataForServer(error.message);
  }

};
loadDataForServer();
}

export default addStringDataForServer;