import axios from "configs/axios";

const API_LIST = {
  getScreenDataAPI: "/api/examinee-search/examinee-search/get-screen-data",
  displayExamineeSearchAPI: "/api/examinee-search/examinee-search/display",
  examineeSearchAPI: "/api/examinee-search/examinee-search",
  deleteExamineeSearchAPI: "/api/examinee-search/examinee-search/delete-line",
  excelExamineeSearchAPI: "/api/examinee-search/examinee-search/excel",
};

const ExamineeSearchService = {
  async getScreenDataService() {
    return axios.get(API_LIST.getScreenDataAPI);
  },
  async displayExamineeSearchService(params) {
    return axios.post(API_LIST.displayExamineeSearchAPI, params);
  },
  async getExamineeSearchService() {
    return axios.get(API_LIST.examineeSearchAPI);
  },
  async deleteExamineeSearchService(params) {
    return axios.post(API_LIST.deleteExamineeSearchAPI, params);
  },
  async excelExamineeSearchService(params) {
    return axios.post(API_LIST.excelExamineeSearchAPI, params, {responseType: 'blob'});
  },
};

export default ExamineeSearchService;
