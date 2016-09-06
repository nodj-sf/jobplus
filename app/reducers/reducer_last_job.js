export default function(state = '', action) {
  switch (action.type) {
    case 'LAST_JOB':
      return action.payload;
    default:
      return state;
  }
}
