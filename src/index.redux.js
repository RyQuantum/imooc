const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

export const counter = (state = 10, action) => {
  switch (action.type) {
    case '加机关枪':
      return state + 1;
    case '减机关枪':
      return state - 1;
    default:
      return state;
  }
};

export const addGun = () => ({type: ADD_GUN});
export const removeGun = () => ({type: REMOVE_GUN});
export const addGunAsync = () =>
    dispatch => setTimeout(() => dispatch(addGun()), 2000);