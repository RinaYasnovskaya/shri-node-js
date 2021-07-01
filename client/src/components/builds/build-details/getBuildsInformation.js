import axios from "axios";
import { setBuildDetails, setBuildLog } from "../../../reducer";

export const getBuildInformation = (buildId, dispatch) => async () => {
  const resultInfo = axios.get(`http://localhost:3000/api/builds/${buildId}`);
  const resultLog = axios.get(`http://localhost:3000/api/builds/${buildId}/logs`);

  dispatch(setBuildDetails(resultInfo.data));
  dispatch(setBuildLog(resultLog.data));
};
