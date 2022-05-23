import axios from "configs/axios";

const API_LIST = {
  getScreenData: "/api/collect-judge/query-examinee/get-screen-data",
};

const QueryExamineeService = {
  async getScreenData(params) {
    return axios.post(API_LIST.getScreenData, params);
  },
};

export default QueryExamineeService;