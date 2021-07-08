import { CONTACTSINFO_LOADING, CONTACTSINFO_ERROR, CONTACTSINFO_SET } from './contactsInfoAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function contactsInfoReducer(state=initState,action) {
  switch (action.type) {

    case CONTACTSINFO_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case CONTACTSINFO_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case CONTACTSINFO_SET: {
      let newState={
        status:3,
        data:action.contactsInfo,
      };
      return newState;
    }
    
    default:
      return state;
  }
}

export default contactsInfoReducer;
