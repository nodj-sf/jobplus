export default function(state = '', action) {
  switch (action.type) {
    case 'LOCATION_INPUT_TERM':
      return action.payload.locationTerm;
    default:
      return state;
  }
}
