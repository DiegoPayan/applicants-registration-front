import { AUTH, HANDLE_SNACKBAR, GET_ASPIRANTES,GET_ASPIRANTE_BY_ID } from './actionTypes';

const initialState = {
  aspirantes: undefined,
  aspiranteById: undefined,
  auth: undefined,
  snackbar: {}
};

const usuarios = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case GET_ASPIRANTES:
      return Object.assign({}, state, {
        aspirantes: action.data
      });
    case AUTH:
      return Object.assign({}, state, {
        auth: action.data
      });
    case GET_ASPIRANTE_BY_ID:
      return Object.assign({}, state, {
        aspiranteById: action.data
      });
    case HANDLE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: action.data
      });
    default:
      return state;
  }
};

export default usuarios;