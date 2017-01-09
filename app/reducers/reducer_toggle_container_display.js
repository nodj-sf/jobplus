export default function(state = {}, action) {
  // Utility function returns the string value of the `listName` action's input:
  const extractListName = () => action.type.replace(/TOGGLE_DISPLAY_LIST_/, '');

  switch (action.type) {
    case `TOGGLE_DISPLAY_LIST_${extractListName()}`:
      state = [...new Set(Object.keys(state).concat(`list_container_${extractListName()}`))]
        .reduce((memo, curr) => {
          memo[curr] = (curr === `list_container_${extractListName()}`
            ? !(~~state[`list_container_${extractListName()}`])
            : state[curr]
          );
          return memo;
        }, {});
    default:
      return state;
  }
};
