// export const ToggleModalOn = () => {
//   console.log("Modal toggled");
//   return {
//     type: "MODAL_STATE",
//     payload: true
//   };  
// };


export const ToggleModal = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        // ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};
