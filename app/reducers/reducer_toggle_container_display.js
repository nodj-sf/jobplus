let listDisplayStates = [
  'jobListDisplayState',
  'restaurantListDisplayState',
  'busListDisplayState',
  'trainListDisplayState',
  'parkListDisplayState',
  'gymListDisplayState'
].reduce((memo, curr) => {
    memo[curr] = 'none';
    return memo;
  }, {});

export default function(state = listDisplayStates, action) {
  const displayStateToggle = (displayState) => displayState === 'flex' ? 'none' : 'flex';

  switch (action.type) {
    case 'TOGGLE_BUS_LIST_DISPLAY':
      console.log("BUSUSUSUSUS");
      // state.busListDisplayState = displayStateToggle(state.busListDisplayState);
      return state;
    case 'TOGGLE_TRAIN_LIST_DISPLAY':
      // state.trainListDisplayState = displayStateToggle(state.trainListDisplayState);
      // return state;
      console.log("Payload:", action.payload, '\nSTATE:', state);
      state.trainListDisplayState = action.payload;
      return state;

      // return displayStateToggle(state.trainListDisplayState);
    case 'TOGGLE_PARK_LIST_DISPLAY':
      state.parkListDisplayState = displayStateToggle(state.parkListDisplayState);
      return state;
    case 'TOGGLE_GYM_LIST_DISPLAY':
      state.gymListDisplayState = displayStateToggle(state.gymListDisplayState);
      return state;
    default:
      return state;
  }
};
