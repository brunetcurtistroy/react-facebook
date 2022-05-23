import axios from "configs/axios";

const API_LIST = {
    getScreenData:"/api/spread-input/findings-input-normal-select",
    confirmBtn:"/api/spread-input/findings-input-normal-select/confirm-btn",
    sitFidingInputThisTime:"/api/spread-input/findings-input-normal-select/site-findings-input-this-time",
    siteFindingsQueryPrevious:"/api/spread-input/findings-input-normal-select/site-findings-query-previous",
    saveData:"/api/spread-input/findings-input-normal-select/save-data",
    deleteData:"/api/spread-input/findings-input-normal-select/delete-data",
    lastTimeDoBtn:"/api/spread-input/findings-input-normal-select/last-time-do-btn",
    changeCategoryJudge:"/api/spread-input/findings-input-normal-select/change-category-judge"
};

const FindingsInputNormalSelectService = {
  async GetScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, { params });
  },
  async ConfirmBtnService(params) {
    return axios.post(API_LIST.confirmBtn, params);
  },
  async SitFidingInputThisTimeService(params) {
    return axios.get(API_LIST.sitFidingInputThisTime, { params });
  },
  async SiteFindingsQueryPreviousService(params) {
    return axios.get(API_LIST.siteFindingsQueryPrevious, { params });
  },
  async SaveDataService(params) {
    return axios.post(API_LIST.saveData, params );
  },
  async DeleteDataService(params) {
    return axios.delete(API_LIST.deleteData, { params });
  },
  async LastTimeDoBtnService(params) {
    return axios.post(API_LIST.lastTimeDoBtn, params );
  },
  async ChangeCategoryJudgeService(params) {
    return axios.post(API_LIST.changeCategoryJudge, params);
  },
};

export default FindingsInputNormalSelectService;