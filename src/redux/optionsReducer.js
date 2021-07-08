import { OPTIONS_CHANGE_CURRENTSELECT, OPTIONS_CHANGE_WORKMODE } from './optionsAC';

const initState={
  currentSelect: 'По умолчанию',
  workMode:'viewLargeIcons',
}

function optionsReducer(state=initState,action) {
  switch (action.type) {

    case OPTIONS_CHANGE_CURRENTSELECT: {
      // console.log('action:',action);
      // console.log('state до обработки редьюсером:',state);
      let newState={...state,
        currentSelect:action.changevalue,
        
      };
      // console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    case OPTIONS_CHANGE_WORKMODE: {
      // console.log('action:',action);
      // console.log('state до обработки редьюсером:',state);
      let newState={...state,
        workMode:action.changevalue,
        
      };
      // console.log('state после обработки редьюсером:',newState);
      return newState;
    }

    default:
      return state;
  }
}

export default optionsReducer;
