import { GET_USERS } from './actionTypes';

const initialState = {
  usuarios: []
};

const usuarios = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        values: action.data
      });
    default:
      return state;
  }
};

export default usuarios;