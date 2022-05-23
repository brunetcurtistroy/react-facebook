import axios from "configs/axios";

const API_LIST = {
  getScreenDataAPI:
    "/api/results-tbl-collect-output/result-tbl-batch-create/print-sub",
};

const PrintSubService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenDataAPI);
  },
};

export default PrintSubService;
