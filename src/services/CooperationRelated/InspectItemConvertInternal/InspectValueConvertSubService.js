import axios from "configs/axios";

const API_LIST = {
  getListDataAPI:
    "/api/inspect-item-convert-internal/inspect-value-convert-sub/get-list-data",
  saveDataAPI:
    "/api/inspect-item-convert-internal/inspect-value-convert-sub/save-data",
  deleteDataAPI:
    "/api/inspect-item-convert-internal/inspect-value-convert-sub/delete-data",
};

const InspectValueConvertSubService = {
  async getListDataService(params) {
    console.log(params);
    return axios.get(API_LIST.getListDataAPI, { params });
  },
  async saveDataService(params) {
    console.log(params);
    return axios.post(API_LIST.saveDataAPI, params);
  },
  async deleteDataService(params) {
    console.log(params);
    return axios.delete(API_LIST.deleteDataAPI, { params });
  },
};

export default InspectValueConvertSubService;
