import axios from "axios";
import { Dispatch } from "react";
import { Action } from "redux";
import { setBuildDetails, setBuildLog } from "../reducer";

export const getBuildsInformation = (buildId: string) => async (dispatch: Dispatch<Action>) => {
  const resultInfo = await axios.get(`http://localhost:3000/api/builds/${buildId}`);
  const resultLog = await axios.get(`http://localhost:3000/api/builds/${buildId}/logs`);

  dispatch(setBuildDetails(resultInfo.data));
  dispatch(setBuildLog(resultLog.data));
};
