import axios from "configs/axios";

const API_LIST = {
  GetListParentAPI:
    "/api/spread-input/spreadsheet-input-setting/get-list-parent",
  GetListChildAPI: "/api/spread-input/spreadsheet-input-setting/get-list-child",
  CreateParentSpreadsheetInputSettingAPI:
    "/api/spread-input/spreadsheet-input-setting/create-parent",
  DeleteParentSpreadsheetInputSettingAPI:
    "/api/spread-input/spreadsheet-input-setting/delete-parent",
  SaveChildSpreadsheetInputSettingAPI:
    "/api/spread-input/spreadsheet-input-setting/save-child",
  DeleteChildSpreadsheetInputSettingAPI:
    "/api/spread-input/spreadsheet-input-setting/delete-child",
};

const SpreadsheetInputSettingService = {
  // API 1
  async getListParentService() {
    return axios.get(API_LIST.GetListParentAPI);
  },
  // API 4
  async getListChildService(params) {
    return axios.get(API_LIST.GetListChildAPI, { params });
  },
  // API 2
  async createParentSpreadsheetInputSettingService(params) {
    return axios.post(API_LIST.CreateParentSpreadsheetInputSettingAPI, params);
  },
  // API 3
  async deleteParentSpreadsheetInputSettingService(params) {
    return axios.delete(API_LIST.DeleteParentSpreadsheetInputSettingAPI, {
      params,
    });
  },
  // API 5
  async saveChildSpreadsheetInputSettingService(params) {
    return axios.post(API_LIST.SaveChildSpreadsheetInputSettingAPI, params);
  },
  // API 6
  async deleteChildSpreadsheetInputSettingService(params) {
    return axios.delete(API_LIST.DeleteChildSpreadsheetInputSettingAPI, {
      params,
    });
  },
};

export default SpreadsheetInputSettingService;
