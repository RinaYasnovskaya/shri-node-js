import axios from 'axios';
import { startBuild } from '../../reducer';

export const runBuild = (hash, history) => async () => {
  const response = await axios.post(`http://localhost:3000/api/builds/${hash}`);
  console.log('res: ', response.data);
  // const { data: { id } } = response.data;
  window.location.href = `/`;
};
