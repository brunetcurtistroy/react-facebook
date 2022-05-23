import axios from "configs/axios";

const API_LIST = {
  ChangeAPI: "/api/spread-input/change",
};

const ChangeService = {
  async ChangeService(params) {
    return axios.post(API_LIST.ChangeAPI, params);
  },
};

export default ChangeService;
