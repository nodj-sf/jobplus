export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL_ON':
      // console.log(`Action ${action} on ToggleModal Reducer.`);
      // return action.payload;
      return action.payload;
    case 'TOGGLE_MODAL_OFF':
      // console.log(`Action ${action} on ToggleModal Reducer.`);
      return action.payload;
    default:
      return state;
  }
};
