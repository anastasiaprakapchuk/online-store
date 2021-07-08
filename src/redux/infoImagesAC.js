const INFOIMAGES_LOADING='INFOIMAGES_LOADING';
const INFOIMAGES_ERROR='INFOIMAGES_ERROR';
const INFOIMAGES_SET='INFOIMAGES_SET';

const infoImagesLoadingAC=function() {
  return {
    type: INFOIMAGES_LOADING,
  };
}

const infoImagesErrorAC=function() {
  return {
    type: INFOIMAGES_ERROR,
  };
}

const infoImagesSetAC=function(data) {
  return {
    type: INFOIMAGES_SET,
    imagesInfo:data.imagesInfo,
  };
}

export {
  infoImagesLoadingAC,INFOIMAGES_LOADING,
  infoImagesErrorAC,INFOIMAGES_ERROR,
  infoImagesSetAC,INFOIMAGES_SET,
}
