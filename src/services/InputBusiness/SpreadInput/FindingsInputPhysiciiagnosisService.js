import axios from "configs/axios";

const API_LIST = {
    getScreenData:"/api/spread-input/findings-input-physiciiagnosis",
    getListDataUpTable:"/api/spread-input/findings-input-physiciiagnosis/get-list-data-up",
    getListDataDownTable:"/api/spread-input/findings-input-physiciiagnosis/get-list-data-down",
    saveDataDown:"/api/spread-input/findings-input-physiciiagnosis/save-data-down",
    deleteDataDown:"/api/spread-input/findings-input-physiciiagnosis/delete-data-down",
    changeData:"/api/spread-input/findings-input-physiciiagnosis/change-data-up",
    exit: "/api/spread-input/findings-input-physiciiagnosis/exit"
};

const FindingsInputPhysiciiagnosisService = {
  async GetScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },
  async GetListDataUpTableService(params) {
    return axios.get(API_LIST.getListDataUpTable, { params });
  },
  async GetListDataDownTableService(params) {
    return axios.get(API_LIST.getListDataDownTable, { params });
  },
  async SaveDataDownService(params) {
    return axios.post(API_LIST.saveDataDown, params);
  },
  async DeleteDataDownService(params) {
    return axios.delete(API_LIST.deleteDataDown, { params });
  },
  async ChangeDataService(params) {
    return axios.post(API_LIST.changeData, params);
  },
  async exitService(params) {
    return axios.post(API_LIST.exit, params);
  },
};

export default FindingsInputPhysiciiagnosisService;