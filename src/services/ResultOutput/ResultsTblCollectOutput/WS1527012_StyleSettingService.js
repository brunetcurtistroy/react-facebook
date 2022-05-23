import axios from "configs/axios";

const API_LIST = {
  getListDataAPI:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting/list-data",
  saveDataAPI:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting/save-data",
  deleteDataAPI:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting/delete-data",
  F9API:
    "/api/results-tbl-collect-output/setup-result-tbl-collect-output/style-setting/f9",
};

const WS1527012_StyleSettingService = {
  async getListDataService(params) {
    return axios.get(API_LIST.getListDataAPI, { params });
  },
  async saveDataService(params) {
    return axios.post(API_LIST.saveDataAPI, params);
  },
  async deleteDataService(params) {
    return axios.delete(API_LIST.deleteDataAPI, { params });
  },
  async submitF9Service(params) {
    return axios.post(API_LIST.F9API, params);
  },
};

export default WS1527012_StyleSettingService;
