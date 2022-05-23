import axios from "configs/axios";

const API_LIST = {
  GetScreenDataAPI:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/pattan-copy/get-screen-data",
  RunF12API:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/pattan-copy/run-f12",
};

const WS1527024_PattanCopyService = {
  async getScreenDataService(params) {
    return axios.get(API_LIST.GetScreenDataAPI, { params });
  },
  async RunF12Service(params) {
    return axios.post(API_LIST.RunF12API, params);
  },
};

export default WS1527024_PattanCopyService;
