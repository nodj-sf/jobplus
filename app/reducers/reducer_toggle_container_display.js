let listDisplayStates = [
  'jobListDisplayState',
  'restaurantListDisplayState',
  'busListDisplayState',
  'trainListDisplayState',
  'parkListDisplayState',
  'gymListDisplayState'
].reduce((memo, curr) => {
    memo[curr] = 'flex';
    return memo;
  }, {});

export default function(state = listDisplayStates, action) {
  const displayStateToggle = (displayState) => displayState === 'flex' ? 'none' : 'flex';

  switch (action.type) {
    case 'TOGGLE_BUS_LIST_DISPLAY':
      console.log("BUSUSUSUSUS");
      // state.busListDisplayState = displayStateToggle(state.busListDisplayState);
      state.busListDisplayState = displayStateToggle(state.busListDisplayState);
    case 'TOGGLE_TRAIN_LIST_DISPLAY':
      // state.trainListDisplayState = displayStateToggle(state.trainListDisplayState);
      // return state;
      console.log("Payload:", action.payload, '\nSTATE:', state);
      // state.trainListDisplayState = action.payload;
      // return state;
      // Object.assign(state, { trainListDisplayState: displayStateToggle(state.trainListDisplayState)});

      // return displayStateToggle(state.trainListDisplayState);
      state.trainListDisplayState = displayStateToggle(state.trainListDisplayState);
    case 'TOGGLE_PARK_LIST_DISPLAY':
      state.parkListDisplayState = displayStateToggle(state.parkListDisplayState);
    case 'TOGGLE_GYM_LIST_DISPLAY':
      state.gymListDisplayState = displayStateToggle(state.gymListDisplayState);
    default:
      return state;
  }
};
