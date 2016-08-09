export const ToggleModalOff = () => {
  console.log("Modal toggled");
  return {
    type: "MODAL_STATE",
    payload: false
  };  
}
