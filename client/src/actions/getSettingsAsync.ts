import axios from "axios";
import { Dispatch } from "react";
import { Action } from "redux";
import { setSettings } from "../reducer";

export const getSettingsAsync = () => async (dispatch: Dispatch<Action>) => {
  const response = await axios.get('http://localhost:3000/api/settings');

  if (response.data.data) {
    dispatch(setSettings(response.data.data));
  }
};
