import axios from "configs/axios";

const API_LIST = {
  getScreenDataAPI:
    "/api/inspect-item-convert-internal/quantitative-qualitative-transformation-sub/get-screen-data",
  getListDataAPI:
    "/api/inspect-item-convert-internal/quantitative-qualitative-transformation-sub/get-list-data",
  saveDataAPI:
    "/api/inspect-item-convert-internal/quantitative-qualitative-transformation-sub/save-data",
  deleteDataAPI:
    "/api/inspect-item-convert-internal/quantitative-qualitative-transformation-sub/delete-data",
};

const QuantitativeQualitativeTransformationSubService = {
  async getScreenDataService(params) {
    console.log(params);
    return axios.get(API_LIST.getScreenDataAPI, { params });
  },
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

export default QuantitativeQualitativeTransformationSubService;
