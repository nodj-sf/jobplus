export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      state = !state;
    default:
      return state;
  }
};
