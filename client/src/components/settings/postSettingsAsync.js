import axios from 'axios';
import { settingsResult, settingsIsDone } from '../../reducer';

export const postSettingsAsync = (settings, funcDisabled) => async (dispatch) => {
  dispatch(settingsIsDone('start'));
  axios
    .post('http://localhost:3000/api/settings', {...settings })
    .then((response) => {
      dispatch(settingsIsDone('done'));
      funcDisabled(false);
      dispatch(settingsResult(response.data));
    })
    .catch((err) => {
      funcDisabled(false);
      dispatch(settingsIsDone('error'));
    })
}
