import axios from "configs/axios";

const API_LIST = {
  getPeriodTimeInquiryAPI: "/api/reserve-status-search/time-acquisition",
  GetScreenDataAPI:
    "/api/reserve-status-search/reserve-status-search/get-screen-data",
  RecreateDisplayAPI:
    "/api/reserve-status-search/reserve-status-search/recreate-display",
  ExamineeListAPI:
    "/api/reserve-status-search/reserve-status-search/examinee-list",
  Delete_Exam_User_Action_3A_API:
    "/api/reserve-status-search/reserve-status-search/exam/delete-data",
  ExcelDownloadAPI: "/api/reserve-status-search/reserve-status-search/excel",
  Doubleclick: '/api/reserve-status-search/reserve-status-search/db-click',
};

const ReserveStatusSearchService = {
  async getPeriodTimeInquiryAPIService() {
    return axios.get(API_LIST.getPeriodTimeInquiryAPI);
  },
  async getScreenDataService() {
    return axios.get(API_LIST.GetScreenDataAPI);
  },
  async getRecreateDisplayService(params) {
    return axios.get(API_LIST.RecreateDisplayAPI, { params });
  },
  async getExamineeListService(params) {
    return axios.get(API_LIST.ExamineeListAPI, { params });
  },
  async delete_Exam_User_Action_3A_Service(params) {
    return axios.delete(API_LIST.Delete_Exam_User_Action_3A_API, { params });
  },
  async ExcelDownloadService(params) {
    return axios.post(API_LIST.ExcelDownloadAPI, params, {responseType: 'blob'});
  },
  async DoubleclickService(params) {
    return axios.post(API_LIST.Doubleclick,  params )
  }
};

export default ReserveStatusSearchService;
