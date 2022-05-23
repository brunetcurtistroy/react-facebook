import axios from "configs/axios";

const API_LIST = {
  getScreenData: "/api/collect-judge/collect-judge/get-screen-data",
  getDataBySearch: "/api/collect-judge/collect-judge/search-data",
  verification: "/api/collect-judge/collect-judge/verification",
};

const CollectJudgeService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenData);
  },

  async getDataBySearchService(params) {
    return axios.get(API_LIST.getDataBySearch, { params });
  },

  async verification(params) {
    return axios.post(API_LIST.verification, params);
  }
};

export default CollectJudgeService;