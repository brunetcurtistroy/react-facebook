import axios from "configs/axios";

const API_LIST = {
  GetScreenDataAPI: "/api/reserve-status-search/display-content-change",
  ConfirmAPI: "/api/reserve-status-search/display-content-change/confirm-btn",
};

const DisplayContentChangeService = {
  async getScreenDataService() {
    return axios.get(API_LIST.GetScreenDataAPI);
  },
  async confirmService(params) {
    return axios.post(API_LIST.ConfirmAPI, params);
  },
};

export default DisplayContentChangeService;
