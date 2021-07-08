import { INFOIMAGES_LOADING, INFOIMAGES_ERROR, INFOIMAGES_SET } from './infoImagesAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function infoImagesReducer(state=initState,action) {
  switch (action.type) {

    case INFOIMAGES_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case INFOIMAGES_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case INFOIMAGES_SET: {
      let newState={
        status:3,
        data:action.imagesInfo,
      };
      return newState;
    }
    
    default:
      return state;
  }
}

export default infoImagesReducer;
