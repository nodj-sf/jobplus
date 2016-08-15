export default function(state = '', action) {
  switch (action.type) {
    case 'JOB_INPUT_TERM':
      return action.payload.jobTerm;
    default:
      return state;
  }
}
