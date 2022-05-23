import axios from "configs/axios";

const API_LIST = {
    getScreenData: "/api/spread-input/findings-input-radiography/get-screen-data",
    findingsComfirm:"/api/spread-input/findings-input-radiography/findings-confirm",
    getListDataLeftTable:"/api/spread-input/findings-input-radiography/get-list-data-left",
    saveDataLeft:"/api/spread-input/findings-input-radiography/save-data-left",
    deleteDataLeft:"/api/spread-input/findings-input-radiography/delete-data-left",
    getListDataRightTable:"/api/spread-input/findings-input-radiography/get-list-data-right",
    changeSiteCode: "/api/spread-input/findings-input-radiography/change-site-and-findings",
    f7: "/api/spread-input/findings-input-radiography/f7",
    f11:"/api/spread-input/findings-input-radiography/f11",
    ChangeCategoryJudge:"/api/spread-input/findings-input-radiography/change-category-judge"
};

const FindingsInputRadiographyService = {
  async GetScreenDataService(params) {
    return axios.get(API_LIST.getScreenData, {params});
  },
  async FindingsComfirmService(params) {
    return axios.post(API_LIST.findingsComfirm, params);
  },
  async GetListDataLeftTableService(params) {
    return axios.get(API_LIST.getListDataLeftTable, {params});
  },
  async SaveDataLeftService(params) {
    return axios.post(API_LIST.saveDataLeft, params);
  },
  async DeleteDataLeftService(params) {
    return axios.delete(API_LIST.deleteDataLeft, {params});
  },
  async GetListDataRightTableService(params) {
    return axios.get(API_LIST.getListDataRightTable, {params});
  },
  async getChangeSiteAndFindingsCodeService(params) {
    return axios.get(API_LIST.changeSiteCode, {params});
  },
  async f7WithLiLeadershipMattersHowToAdd(params) {
    return axios.post(API_LIST.f7,params);
  },
  async f11Service(params) {
    return axios.post(API_LIST.f11, params);
  },
  async ChangeCategoryJudgeService(params) {
    return axios.post(API_LIST.ChangeCategoryJudge, params);
  },
};

export default FindingsInputRadiographyService;