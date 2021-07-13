import axios from "axios";
import { setSettings } from "../reducer";

export const getSettingsAsync = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3000/api/settings');

  if (response.data.data) {
    dispatch(setSettings(response.data.data));
  }
};
