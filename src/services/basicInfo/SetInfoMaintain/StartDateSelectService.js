import axios from "configs/axios";

const apiPaths = {
    startDateSelect : "/api/set-info-maintain/start-date-select",
};

const StartDateSelectService = {
  async StartDateSelect (params) {
    return axios.post(apiPaths.startDateSelect, params);
  }
};
  
export default StartDateSelectService;
