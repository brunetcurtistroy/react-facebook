import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/copying-process",
    copy: "/api/associate-insure-money-amount-setting/copying-process/copy",
};

const CopyingProcessService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async copyProcess(params) {
    return axios.put(apiPaths.copy, params);
  }
};
  
export default CopyingProcessService;
