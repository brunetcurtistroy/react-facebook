import axios from "configs/axios";

const apiPaths = {
    copyStartDate : "/api/set-info-maintain/copy-start-date",
};

const CopyStartDateService = {
  async CopyStartDate(params) {
    return axios.post(apiPaths.copyStartDate, params);
  }
};
  
export default CopyStartDateService;
