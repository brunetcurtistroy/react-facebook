import axios from "configs/axios";

const apiPaths = {
    screenDataRadiographyFindingInputSub : "/api/radiography-finding-input/radiography-finding-input-sub/get-screen-data",
    listDataFindingsContent: "/api/radiography-finding-input/radiography-finding-input-sub/get-list-findings-content",
    listDataPreviousFindingsContent: "/api/radiography-finding-input/radiography-finding-input-sub/get-list-previous-findings-content",
    lastTimeDoBtn: "/api/radiography-finding-input/radiography-finding-input-sub/last-time-do-btn",
    lastTimeDoBtnYes: "/api/radiography-finding-input/radiography-finding-input-sub/last-time-do-btn-yes",
    settingBtn: "/api/radiography-finding-input/radiography-finding-input-sub/setting-btn",
    changeSiteAndFindingsCode: "/api/radiography-finding-input/radiography-finding-input-sub/change-site-and-findings",
    saveFindingsContent: "/api/radiography-finding-input/radiography-finding-input-sub/save-findings-content",
    deleteFindingsContent: "/api/radiography-finding-input/radiography-finding-input-sub/delete-findings-content",
    f12:"/api/radiography-finding-input/radiography-finding-input-sub/f12",
  };

const RadiographyFindingInputSubService = {
  async screenDataRadiographyFindingInputSubService(params) {
    return axios.get(apiPaths.screenDataRadiographyFindingInputSub, {params});
  },
  async listDataFindingsContentService(params) {
    return axios.get(apiPaths.listDataFindingsContent, {params});
  },
  async listDataPreviousFindingsContentService(params) {
    return axios.get(apiPaths.listDataPreviousFindingsContent, {params});
  },
  async lastTimeDoBtnService(params) {
    return axios.get(apiPaths.lastTimeDoBtn, {params});
  },
  async lastTimeDoBtnYesService(params) {
    return axios.post(apiPaths.lastTimeDoBtnYes, params);
  },
  async settingBtnService(params) {
    return axios.post(apiPaths.settingBtn, params);
  },
  async changeSiteAndFindingsCodeService(params) {
    return axios.get(apiPaths.changeSiteAndFindingsCode, {params});
  },
  async saveFindingsContentService(params) {
    return axios.post(apiPaths.saveFindingsContent, params);
  },
  async deleteFindingsContentService(params) {
    return axios.delete(apiPaths.deleteFindingsContent, {params});
  },
  async f12Service(params) {
    return axios.post(apiPaths.f12, params);
  }
};
  
export default RadiographyFindingInputSubService;