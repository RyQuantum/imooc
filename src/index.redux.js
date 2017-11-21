const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

export const counter = (state = 0, action) => {
  switch (action.type) {
    case '加机关枪':
      return state + 1;
    case '减机关枪':
      return state - 1;
    default:
      return 10;
  }
};

export const addGUN = () => ({type: ADD_GUN});
export const removeGUN= () => ({type: REMOVE_GUN});