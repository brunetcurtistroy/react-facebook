import axios from "configs/axios";

const APP_LIST = {
  getScreenData: "/api/dispatch-manage/dispatch-manage/get-screen-data",
  changePersonalId: "/api/dispatch-manage/dispatch-manage/change-personal-id",
  personalConfirm: "/api/dispatch-manage/dispatch-manage/personal-number-confirmed",
  personalConfirm_2: "/api/dispatch-manage/dispatch-manage/personal-number-confirmed-2",
  getDataSub: "/api/dispatch-manage/dispatch-manage/dispatch-manage-sub",
  updateDataSub: "/api/dispatch-manage/dispatch-manage/dispatch-manage-sub-update",
  deleteRecord: "/api/dispatch-manage/dispatch-manage/logical-delete",
  readingUpdate: "/api/dispatch-manage/dispatch-manage/reading-info-update",
  CsvOutput: "/api/dispatch-manage/dispatch-manage/csv",
  ReadingInfoUpdate: "/api/dispatch-manage/dispatch-manage/reading-info-update"
};

const DispatchManageService = {
  async getScreenData(params) {
    return axios.get(APP_LIST.getScreenData, { params });
  },

  async changePersonalId(params) {
    return axios.post(APP_LIST.changePersonalId, params);
  },

  async personalConfirm(params) {
    return axios.post(APP_LIST.personalConfirm, params);
  },

  async personalConfirm_2(params) {
    return axios.post(APP_LIST.personalConfirm_2, params);
  },

  async getDataSub() {
    return axios.get(APP_LIST.getDataSub);
  },

  async updateDataSub(params) {
    return axios.post(APP_LIST.updateDataSub, params);
  },

  async deleteRecord(params) {
    return axios.delete(APP_LIST.deleteRecord, { params });
  },

  async CsvOutput(params) {
    return axios.post(APP_LIST.CsvOutput, params, {responseType: 'blob'});
  },

  async ReadingInfoUpdate(params) {
    return axios.post(APP_LIST.ReadingInfoUpdate, params)
  }
};

export default DispatchManageService;
