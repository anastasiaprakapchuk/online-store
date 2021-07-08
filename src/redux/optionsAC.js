
const OPTIONS_CHANGE_WORKMODE = 'OPTIONS_CHANGE_WORKMODE';
const OPTIONS_CHANGE_CURRENTSELECT = 'OPTIONS_CHANGE_CURRENTSELECT';

const options_change_currentselect = function (changevalue) {
  return {
    type: OPTIONS_CHANGE_CURRENTSELECT,
    changevalue: changevalue,
  };
}

const options_change_workmode = function (changevalue) {
  return {
    type: OPTIONS_CHANGE_WORKMODE,
    changevalue: changevalue,
  };
}

export {
  options_change_currentselect, OPTIONS_CHANGE_CURRENTSELECT,
  options_change_workmode, OPTIONS_CHANGE_WORKMODE,
}
