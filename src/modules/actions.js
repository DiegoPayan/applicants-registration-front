import axios from 'axios';
import { AUTH, HANDLE_SNACKBAR, GET_ASPIRANTES, GET_ASPIRANTE_BY_ID } from './actionTypes.js';

export const handleAuth = (clave) => async dispatch => {
  let response;
  try {
    response = await axios.post('/api/auth/', { clave });
  } catch (error) {
    response = error
  }
  dispatch({
    type: AUTH,
    data: response
  });
  return response.data ? response.data : response.response.data
}

export const GetAspirantes = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/aspirantes/',   { headers:{'Authorization':`${localStorage.getItem("token")}`} });
  } catch (error) {
    response = error
  }
  dispatch({
    type: GET_ASPIRANTES,
    data: response
  });
  return response.data ? response.data : response.response.data
}

export const getAspiranteById = (id) => async dispatch => {
  let response;
  try {
    response = await axios.get(`/api/aspirantes/${id}`,   { headers:{'Authorization':`${localStorage.getItem("token")}`} });
  } catch (error) {
    response = error
  }
  dispatch({
    type: GET_ASPIRANTE_BY_ID,
    data: response
  });
  return response.data ? response.data : response.response.data
}

export const handleSnackbar = (props) => async dispatch => {
   dispatch({
    type: HANDLE_SNACKBAR,
    data: props
  });
}
  
