'use strict';
import { TOGGLE_DISPLAY_LIST_ } from '../actions/index';
import { extractIdentifier } from './utilities';


export default function toggleContainerDisplay(state = {}, action) {
  const extractListName = extractIdentifier(action.type, 'TOGGLE_DISPLAY_LIST_');

  switch (action.type) {
    case `TOGGLE_DISPLAY_LIST_${extractListName}`:
      // console.log(`Action <${action.type}> triggered without payload (intentionally).`, state);
      const listName = `list_container_${extractListName}`,
            newState = Object.assign({}, state, {
              [listName]: (listName in state ? !state[listName] : true)
            });
      return newState;
    default:
      return state;
  }
};
