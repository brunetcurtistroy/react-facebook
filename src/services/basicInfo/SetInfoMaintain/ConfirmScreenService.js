import axios from "configs/axios";

const apiPaths = {
    getDataScreen : "/api/set-info-maintain/confirm-screen",
};

const ConfirmScreenService = {
  async getDataScreen(params) {
    return axios.get(apiPaths.getDataScreen, {params});
  }
};
  
export default ConfirmScreenService;
