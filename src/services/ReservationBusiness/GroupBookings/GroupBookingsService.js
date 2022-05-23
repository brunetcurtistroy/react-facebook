import axios from "configs/axios";

const API_LIST = {
  getScreenData: "/api/group-bookings/get-screen-data",
  eventExtract: "/api/group-bookings/extract",
  subExtract: '/api/group-bookings/sub-extract',
  clear: "/api/group-bookings/clear",
  eventF12: '/api/group-bookings/f12',
  confirmCallScreen: '/api/group-bookings/confirm-sub-yes',
  selectCheckbox: '/api/group-bookings/select-all',
  selectOneLineCheckbox: '/api/group-bookings/select-one-line',
  updateData: '/api/group-bookings/update-data',
  deleteData: '/api/group-bookings/delete-data',
  getNameCourseCode: '/api/group-bookings/get-name-contract-short-name',
  getNameOfficeCode: '/api/group-bookings/get-name-office-code',

  getConfirmsubRecordChanging: '/api/group-bookings/ConfirmSub',
  updateChanged: '/api/group-bookings/ConfirmSub/f12'
};

const GroupBookingsService = {
  async getScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, {params});
  },
  async eventExtractService(params) {
    return axios.get(API_LIST.eventExtract, { params });
  },
  async subExtractService() {
    return axios.get(API_LIST.subExtract);
  },
  async clearService(params) {
    return axios.delete(API_LIST.clear, { params });
  },
  async eventF12Service(params) {
    return axios.post(API_LIST.eventF12, params);
  },
  async confirmCallScreenService(params) {
    return axios.post(API_LIST.confirmCallScreen, params);
  },
  async selectCheckboxService(params) {
    return axios.post(API_LIST.selectCheckbox, params);
  },
  async selectOneLineCheckboxService(params) {
    return axios.post(API_LIST.selectOneLineCheckbox, params);
  },
  async updateDataService(params) {
    return axios.put(API_LIST.updateData, params);
  },
  async deleteDataService(params) {
    return axios.delete(API_LIST.deleteData, { params });
  },
  async getNameCourseCodeService(params) {
    return axios.get(API_LIST.getNameCourseCode, { params });
  },
  async getNameOfficeCodeService(params) {
    return axios.get(API_LIST.getNameOfficeCode, { params });
  },

  // WS2533001_ConfirmSub
  async getConfirmsubRecordChangingService(params) {
    return axios.post(API_LIST.getConfirmsubRecordChanging, params);
  },
  async updateChangedService(params) {
    return axios.post(API_LIST.updateChanged, params);
  },
};

export default GroupBookingsService;
