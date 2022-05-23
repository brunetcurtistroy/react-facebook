import axios from "configs/axios";

const apiPaths = {
  examineeList: "/api/examinee-list/examinee-list",
  excelReport: '/api/examinee-list/examinee-list/user-action-10',
  eventF11: '/api/examinee-list/examinee-list/f11'
};

const ExamineeListService = {
  async getDataExamineeList(params) {
    return axios.get(apiPaths.examineeList, { params });
  },

  async excelReport(params) {
    return axios.get(apiPaths.excelReport, { params, responseType: 'blob' });
  },

  async eventF11() {
    return axios.get(apiPaths.eventF11);
  }
};

export default ExamineeListService;
