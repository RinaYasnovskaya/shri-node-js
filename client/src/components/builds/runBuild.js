import axios from 'axios';
import { startBuild } from '../../reducer';

export const runBuild = (hash, history) => async (dispatch) => {
  const response = await axios.post(`http://localhost:3000/api/builds/${hash}`);
  dispatch(startBuild());
  const { data: id } = response.data;
  history.push(`/build/${id}`);
};
