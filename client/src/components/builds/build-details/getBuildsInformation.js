import axios from "axios";
import { setBuildDetails, setBuildLog } from "../../../reducer";

export const getBuildInformation = (buildId) => async (dispatch) => {
  const resultInfo = await axios.get(`http://localhost:3000/api/builds/${buildId}`);
  const resultLog = await axios.get(`http://localhost:3000/api/builds/${buildId}/logs`);

  dispatch(setBuildDetails(resultInfo.data));
  dispatch(setBuildLog(resultLog.data));
};
