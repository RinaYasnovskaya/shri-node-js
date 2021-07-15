import axios from 'axios';
import { Dispatch } from 'react';
import { Action } from 'redux';
import { settingsResult, settingsIsDone } from '../reducer';

export const postSettingsAsync = (
  settings: any,
  funcDisabled: (arg0: boolean) => void
) => async (dispatch: Dispatch<Action>) => {
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
