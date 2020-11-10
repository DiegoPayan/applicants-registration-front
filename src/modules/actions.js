import axios from 'axios';
import * as types from './actionTypes.js';
import { saveAs } from 'file-saver';
import configureStore from './../redux/store';



export const handleAuth = (clave) => async dispatch => {
  let response;
  try {
    response = await axios.post('/api/auth/', { clave });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.AUTH,
    data: response
  });
  return response.data ? response.data : response.response.data
}

export const getAspirantes = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/aspirantes/', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  response = response.data ? response.data : response.response.data
  dispatch({
    type: types.GET_ASPIRANTES,
    data: response
  });
  return response
}

export const getAspiranteById = (id) => async dispatch => {
  let response;
  try {
    response = await axios.get(`/api/aspirantes/${id}`, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_ASPIRANTE_BY_ID,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const saveAspirante = (aspirante) => async () => {
  let response;
  try {
    response = await axios.post('/api/aspirantes/', { ...aspirante }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}
export const editAspirante = (aspirante) => async () => {
  let response;
  try {
    response = await axios.put(`/api/aspirantes/${aspirante.id}`, { ...aspirante }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  console.log(response);

  return response.data ? response.data : response.response.data
}
export const deregisterAspirante = (aspirante) => async () => {
  let response;
  try {
    response = await axios.post('/api/aspirantes/', { ...aspirante }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}


export const getRamas = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/ramas/', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_RAMAS,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const saveRama = (rama) => async () => {
  let response;
  try {
    response = await axios.post('/api/ramas/', { ...rama }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const updateRama = (id, rama) => async () => {
  let response;
  try {
    response = await axios.put(`/api/ramas/${id}`, { ...rama }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const getEstudios = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/estudios/', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  response = response.data ? response.data : response.response.data
  dispatch({
    type: types.GET_ESTUDIOS,
    data: response
  });
  return response
}

export const saveEstudio = (estudio) => async () => {
  let response;
  try {
    response = await axios.post('/api/estudios/', { ...estudio }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const updateEstudio = (id, estudio) => async () => {
  let response;
  try {
    response = await axios.put(`/api/estudios/${id}`, { ...estudio }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const getPuestos = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/puestos/', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_PUESTOS,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const savePuesto = (puesto) => async () => {
  let response;
  try {
    response = await axios.post('/api/puestos/', { ...puesto }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const updatePuesto = (id, puesto) => async () => {
  let response;
  try {
    response = await axios.put(`/api/puestos/${id}`, { ...puesto }, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  return response.data ? response.data : response.response.data
}

export const getFolio = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/aspirantes/nuevo/folio', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_FOLIO,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const getDisplayDownload = (sc, tl) => async dispatch => {
  let response;
  try {
    response = await axios.get(`/api/aspirantes/lista/ordenada?subcomision=${sc}&tipoLista=${tl}`, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_LISTA_ORDENADA,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const getHistorial = () => async dispatch => {
  let response;
  try {
    response = await axios.get(`/api/historial`, { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_HISTORIAL,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const getZonas = () => async dispatch => {
  let response;
  try {
    response = await axios.get('/api/zonas/', { headers: { 'Authorization': `${sessionStorage.getItem("token")}` } });
  } catch (error) {
    response = error
  }
  dispatch({
    type: types.GET_ZONAS,
    data: response.data
  });
  return response.data ? response.data : response.response.data
}

export const download = (sc, tl) => async dispatch => {
  let response;
  try {
    response = await axios.get(`/api/aspirantes/lista/ordenada/descarga?subcomision=${sc}L&tipoLista=${tl}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `${sessionStorage.getItem("token")}`, 'Content-Type': 'application/vnd.openxmlformats',
        "Content-Disposition": "attachment; filename=" + "Report.xlsx", "responseType": 'blob'
      }
    });
  } catch (error) {
    response = error
  }
  var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'reporte.xlsx');
  response = response.data ? response.data : response.response.data

  return response
}

export const handleSnackbar = (props) => async dispatch => {
  dispatch({
    type: types.HANDLE_SNACKBAR,
    data: props
  });
}

const dispatcher = configureStore.dispatch;
axios.interceptors.request.use(function (config) {
  dispatcher({
    type: types.HANDLE_LOADING,
    data: true
  }); return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  dispatcher({
    type: types.HANDLE_LOADING,
    data: false
  });
  return response;
}, async (error) => {
  dispatcher({
    type: types.HANDLE_LOADING,
    data: false
  });
  let originalRequest = error.config;
  if (error.response.status === 401) {
    return await axios.post('/api/auth/refresh', { token: sessionStorage.getItem("token") })
      .then(async response => {
        if (response.status === 200) {
          sessionStorage.setItem('token', response.data.token.data);
          originalRequest.headers.Authorization = response.data.token.data;

          return await axios(originalRequest);
        }
      }).catch((err) => {
        if (err.response && err.response.config.url === '/api/auth/refresh' && err.response.status >= 400) {
          return err.response;
        }
        return axios(originalRequest);
      });
  }
  dispatcher({
    type: types.HANDLE_LOADING,
    data: false
  });
  return Promise.reject(error);
});