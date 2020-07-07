import * as types from './actionTypes';

const initialState = {
  aspirantes: undefined,
  aspiranteById: undefined,
  auth: undefined,
  snackbar: {},
  ramas: undefined,
  estudios: undefined,
  puestos: undefined
};

const usuarios = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case types.GET_ASPIRANTES:
      return Object.assign({}, state, {
        aspirantes: action.data
      });
    case types.AUTH:
      return Object.assign({}, state, {
        auth: action.data
      });
    case types.GET_RAMAS:
      return Object.assign({}, state, {
        ramas: action.data
      });
    case types.GET_ESTUDIOS:
      return Object.assign({}, state, {
        estudios: action.data
      });
    case types.GET_PUESTOS:
      return Object.assign({}, state, {
        puestos: action.data
      });
    case types.GET_ASPIRANTE_BY_ID:
      return Object.assign({}, state, {
        aspiranteById: action.data
      });
    case types.HANDLE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: action.data
      });
    default:
      return state;
  }
};

export default usuarios;