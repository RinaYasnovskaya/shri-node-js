import axios from "axios";
import { setListBuilds } from '../../../reducer';

export const getBuildsMdw = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3000/api/builds');
  dispatch(setListBuilds(response.data.data));
};
