import axios from 'axios';
import { History } from 'history';
import { startBuild } from '../reducer';

export const runBuild = (hash: string, history: History) => async () => {
  const response = await axios.post(`http://localhost:3000/api/builds/${hash}`);
  // const { data: { id } } = response.data;
  history.push('/');
};
