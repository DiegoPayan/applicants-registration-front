import axios from 'axios';
import { GET_USERS } from './actionTypes.js';

export const getValues = () => async dispatch => {
  await axios.get('/api/values').then((response) => {
    dispatch({
      type: GET_USERS,
      data: response.data
    });
  });
}