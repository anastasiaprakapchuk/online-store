const CONTACTSINFO_LOADING='CONTACTSINFO_LOADING';
const CONTACTSINFO_ERROR='CONTACTSINFO_ERROR';
const CONTACTSINFO_SET='CONTACTSINFO_SET';

const contactsInfoLoadingAC=function() {
  return {
    type: CONTACTSINFO_LOADING,
  };
}

const contactsInfoErrorAC=function() {
  return {
    type: CONTACTSINFO_ERROR,
  };
}

const contactsInfoSetAC=function(data) {
  return {
    type: CONTACTSINFO_SET,
    contactsInfo:data.contactsInfo,
  };
}

export {
  contactsInfoLoadingAC,CONTACTSINFO_LOADING,
  contactsInfoErrorAC,CONTACTSINFO_ERROR,
  contactsInfoSetAC,CONTACTSINFO_SET,
}
