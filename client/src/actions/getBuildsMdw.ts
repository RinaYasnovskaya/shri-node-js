import axios from "axios";
import { Dispatch } from "react";
import { Action } from "redux";
import { setListBuilds } from '../reducer';

export const getBuildsMdw = () => async (dispatch: Dispatch<Action>) => {
  const response = await axios.get('http://localhost:3000/api/builds');
  dispatch(setListBuilds(response.data.data));
};
