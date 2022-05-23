import axios from "configs/axios";

const API_LIST = {
    getScreenData: "/api/spread-input/findings-input-normal/get-screen-data",
    getListDataUpTable:"/api/spread-input/findings-input-normal/get-list-data-up",
    saveDataUp:"/api/spread-input/findings-input-normal/save-data-up",
    deleteDataUp:"/api/spread-input/findings-input-normal/delete-data-up",
    getListDataDownTable:"/api/spread-input/findings-input-normal/get-list-data-down",
    previousDoF11:"/api/spread-input/findings-input-normal/previous-do-f11",
    f7:"/api/spread-input/findings-input-normal/f7",
    ChangeCategoryJudge: "/api/spread-input/findings-input-normal/change-category-judge"
};

const FindingsInputNormalService = {
  async GetScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },
  async GetListDataUpTableService(params) {
    return axios.get(API_LIST.getListDataUpTable, { params });
  },
  async SaveDataUpService(params) {
    return axios.post(API_LIST.saveDataUp, params);
  },
  async DeleteDataUpService(params) {
    return axios.delete(API_LIST.deleteDataUp, {params});
  },
  async GetListDataDownTableService(params) {
    return axios.get(API_LIST.getListDataDownTable, {params});
  },
  async PreviousDoF11Service(params) {
    return axios.post(API_LIST.previousDoF11, params);
  },
  async F7Service(params) {
    return axios.post(API_LIST.f7, params);
  },
  async ChangeCategoryJudgeService(params) {
    return axios.post(API_LIST.ChangeCategoryJudge, params);
  },
};

export default FindingsInputNormalService;