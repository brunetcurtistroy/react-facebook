import axios from "configs/axios";

const apiPaths = {
    setIdentificationChange : "/api/set-info-maintain/set-identification-change",
};

const SetIdentificationChangeService = {
  async SetIdentificationChange (params) {
    return axios.post(apiPaths.setIdentificationChange, params);
  }
};
  
export default SetIdentificationChangeService;
