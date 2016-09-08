export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return state = !state;
    default:
      return state;
  }
};
